#!/usr/bin/env -S npx tsx

/**
 * Publish the Netlify-built production deploy that matches the current GitHub
 * Actions commit. Netlify owns the build because production should exercise the
 * same platform path as deploy previews and branch deploys; GitHub Actions owns
 * the publish gate so production only changes after CI passes.
 */

import { pathToFileURL } from "node:url"

type Fetch = typeof fetch

export type NetlifyDeploy = {
  branch?: string
  commit_ref?: string
  context?: string
  deploy_ssl_url?: string
  deploy_url?: string
  error_message?: string
  id: string
  skipped?: boolean
  ssl_url?: string
  state?: string
  title?: string
  url?: string
}

type PublishOptions = {
  authToken: string
  branch: string
  commitRef: string
  maxAttempts: number
  perPage: number
  pollIntervalMs: number
  siteId: string
}

type Dependencies = {
  fetch: Fetch
  log: (message: string) => void
  sleep: (ms: number) => Promise<void>
}

const pendingStates = new Set([
  "accepted",
  "building",
  "enqueued",
  "new",
  "pending_review",
  "preparing",
  "prepared",
  "processed",
  "processing",
  "retrying",
  "uploaded",
  "uploading",
])

const terminalFailureStates = new Set(["error", "rejected"])

/**
 * Poll Netlify for the production deploy that matches CI's commit, then publish
 * it once it is ready. This keeps the workflow from publishing an older or
 * unrelated deploy while Netlify auto publishing is locked.
 */
export async function publishNetlifyProductionDeploy(
  options: PublishOptions,
  dependencies: Partial<Dependencies> = {},
): Promise<NetlifyDeploy> {
  const deps: Dependencies = {
    fetch: dependencies.fetch ?? fetch,
    log: dependencies.log ?? writeLine,
    sleep:
      dependencies.sleep ??
      ((ms) => new Promise((resolve) => setTimeout(resolve, ms))),
  }

  for (let attempt = 1; attempt <= options.maxAttempts; attempt += 1) {
    const deploys = await listProductionDeploys(options, deps.fetch)
    const deploy = findMatchingDeploy(deploys, options)

    if (!deploy) {
      deps.log(
        `No Netlify production deploy found yet for ${options.commitRef} on ${options.branch}.`,
      )
      await waitForNextAttempt(attempt, options, deps.sleep)
      continue
    }

    deps.log(
      `Found Netlify deploy ${deploy.id} for ${options.commitRef} with state ${deploy.state ?? "unknown"}.`,
    )

    if (deploy.skipped || terminalFailureStates.has(deploy.state ?? "")) {
      throw new Error(formatDeployFailure(deploy))
    }

    if (deploy.state === "ready") {
      return restoreDeploy(deploy.id, options, deps.fetch)
    }

    if (!pendingStates.has(deploy.state ?? "")) {
      throw new Error(
        `Netlify deploy ${deploy.id} has unsupported state ${deploy.state ?? "unknown"}.`,
      )
    }

    await waitForNextAttempt(attempt, options, deps.sleep)
  }

  throw new Error(
    `Timed out waiting for Netlify production deploy for ${options.commitRef} on ${options.branch}.`,
  )
}

/**
 * Select the Netlify production deploy for the exact branch and commit. The
 * explicit match is necessary because Netlify may list deploys from other
 * branches, contexts, or nearby commits while CI is waiting.
 */
export function findMatchingDeploy(
  deploys: NetlifyDeploy[],
  options: Pick<PublishOptions, "branch" | "commitRef">,
): NetlifyDeploy | undefined {
  return deploys.find(
    (deploy) =>
      deploy.commit_ref === options.commitRef &&
      deploy.branch === options.branch &&
      deploy.context === "production",
  )
}

function formatDeployFailure(deploy: NetlifyDeploy): string {
  if (deploy.skipped) {
    return `Netlify deploy ${deploy.id} for ${deploy.commit_ref ?? "unknown commit"} was skipped.`
  }

  const reason = deploy.error_message ? `: ${deploy.error_message}` : ""
  return `Netlify deploy ${deploy.id} failed with state ${deploy.state ?? "unknown"}${reason}.`
}

async function listProductionDeploys(
  options: Pick<PublishOptions, "authToken" | "branch" | "perPage" | "siteId">,
  fetchFn: Fetch,
): Promise<NetlifyDeploy[]> {
  const url = new URL(
    `https://api.netlify.com/api/v1/sites/${encodeURIComponent(options.siteId)}/deploys`,
  )
  url.searchParams.set("production", "true")
  url.searchParams.set("branch", options.branch)
  url.searchParams.set("per_page", String(options.perPage))

  const response = await fetchFn(url, {
    headers: {
      Authorization: `Bearer ${options.authToken}`,
    },
  })

  if (!response.ok) {
    throw new Error(
      `Netlify deploy lookup failed with ${response.status} ${response.statusText}.`,
    )
  }

  return response.json() as Promise<NetlifyDeploy[]>
}

async function restoreDeploy(
  deployId: string,
  options: Pick<PublishOptions, "authToken" | "siteId">,
  fetchFn: Fetch,
): Promise<NetlifyDeploy> {
  const url = `https://api.netlify.com/api/v1/sites/${encodeURIComponent(
    options.siteId,
  )}/deploys/${encodeURIComponent(deployId)}/restore`
  const response = await fetchFn(url, {
    headers: {
      Authorization: `Bearer ${options.authToken}`,
    },
    method: "POST",
  })

  if (!response.ok) {
    throw new Error(
      `Netlify deploy publish failed with ${response.status} ${response.statusText}.`,
    )
  }

  return response.json() as Promise<NetlifyDeploy>
}

async function waitForNextAttempt(
  attempt: number,
  options: Pick<PublishOptions, "maxAttempts" | "pollIntervalMs">,
  sleep: Dependencies["sleep"],
): Promise<void> {
  if (attempt < options.maxAttempts) {
    await sleep(options.pollIntervalMs)
  }
}

function readRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function readPositiveIntegerEnv(name: string, fallback: number): number {
  const value = process.env[name]
  if (!value) {
    return fallback
  }

  const parsed = Number.parseInt(value, 10)
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive integer.`)
  }

  return parsed
}

/**
 * Read the GitHub Actions and Netlify settings needed by the publish job.
 * Keeping this at the CLI boundary lets tests exercise the deploy logic without
 * depending on process environment state.
 */
export function readOptionsFromEnv(): PublishOptions {
  return {
    authToken: readRequiredEnv("NETLIFY_AUTH_TOKEN"),
    branch: process.env.NETLIFY_PRODUCTION_BRANCH ?? "master",
    commitRef: readRequiredEnv("GITHUB_SHA"),
    maxAttempts: readPositiveIntegerEnv("NETLIFY_DEPLOY_MAX_ATTEMPTS", 60),
    perPage: readPositiveIntegerEnv("NETLIFY_DEPLOY_PER_PAGE", 50),
    pollIntervalMs: readPositiveIntegerEnv(
      "NETLIFY_DEPLOY_POLL_INTERVAL_MS",
      10_000,
    ),
    siteId: readRequiredEnv("NETLIFY_SITE_ID"),
  }
}

async function main(): Promise<void> {
  const deploy = await publishNetlifyProductionDeploy(readOptionsFromEnv())
  writeLine(
    `Published Netlify deploy ${deploy.id}: ${
      deploy.ssl_url ?? deploy.url ?? deploy.deploy_ssl_url ?? deploy.deploy_url
    }`,
  )
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error: unknown) => {
    process.stderr.write(`${error instanceof Error ? error.message : error}\n`)
    process.exitCode = 1
  })
}

function writeLine(message: string): void {
  process.stdout.write(`${message}\n`)
}
