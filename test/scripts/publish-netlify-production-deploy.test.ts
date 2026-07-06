import assert from "node:assert/strict"
import test from "node:test"

import {
  findMatchingDeploy,
  type NetlifyDeploy,
  publishNetlifyProductionDeploy,
} from "../../src/scripts/publish-netlify-production-deploy.ts"

const options = {
  authToken: "token",
  branch: "master",
  commitRef: "abc123",
  maxAttempts: 3,
  perPage: 50,
  pollIntervalMs: 1,
  siteId: "site-id",
}

test("finds matching production deploy by commit and branch", () => {
  const matchingDeploy = deploy({ id: "matching" })

  assert.equal(
    findMatchingDeploy(
      [
        deploy({ commit_ref: "other" }),
        deploy({ branch: "feature" }),
        deploy({ context: "branch-deploy" }),
        matchingDeploy,
      ],
      options,
    ),
    matchingDeploy,
  )
})

test("publishes a ready production deploy for the exact commit", async () => {
  const fetch = createFetch([
    [deploy({ id: "ready-deploy" })],
    deploy({ id: "published-deploy", ssl_url: "https://example.netlify.app" }),
  ])

  const published = await publishNetlifyProductionDeploy(options, {
    fetch,
    log: () => {},
    sleep: async () => {},
  })

  assert.equal(published.id, "published-deploy")
  assert.equal(fetch.calls.length, 2)
  assert.equal(fetch.calls[1]?.method, "POST")
  assert.match(fetch.calls[1]?.url ?? "", /\/ready-deploy\/restore$/)
})

test("waits for matching deploys that are still in progress", async () => {
  const fetch = createFetch([
    [deploy({ id: "pending-deploy", state: "building" })],
    [deploy({ id: "pending-deploy", state: "processing" })],
    [deploy({ id: "pending-deploy", state: "ready" })],
    deploy({ id: "published-deploy" }),
  ])
  const slept: number[] = []

  await publishNetlifyProductionDeploy(options, {
    fetch,
    log: () => {},
    sleep: async (ms) => {
      slept.push(ms)
    },
  })

  assert.deepEqual(slept, [1, 1])
  assert.equal(fetch.calls.length, 4)
  assert.equal(fetch.calls[fetch.calls.length - 1]?.method, "POST")
})

test("fails when the matching deploy errors", async () => {
  const fetch = createFetch([
    [deploy({ error_message: "Build failed", id: "failed", state: "error" })],
  ])

  await assert.rejects(
    publishNetlifyProductionDeploy(options, {
      fetch,
      log: () => {},
      sleep: async () => {},
    }),
    /failed with state error: Build failed/,
  )

  assert.equal(fetch.calls.length, 1)
})

test("fails when the matching deploy was skipped", async () => {
  const fetch = createFetch([[deploy({ id: "skipped", skipped: true })]])

  await assert.rejects(
    publishNetlifyProductionDeploy(options, {
      fetch,
      log: () => {},
      sleep: async () => {},
    }),
    /was skipped/,
  )

  assert.equal(fetch.calls.length, 1)
})

test("times out without publishing when no matching deploy appears", async () => {
  const fetch = createFetch([
    [deploy({ commit_ref: "other" })],
    [deploy({ branch: "feature" })],
    [deploy({ context: "deploy-preview" })],
  ])

  await assert.rejects(
    publishNetlifyProductionDeploy(options, {
      fetch,
      log: () => {},
      sleep: async () => {},
    }),
    /Timed out waiting/,
  )

  assert.equal(fetch.calls.length, 3)
  assert.equal(
    fetch.calls.some((call) => call.method === "POST"),
    false,
  )
})

function deploy(overrides: Partial<NetlifyDeploy> = {}): NetlifyDeploy {
  return {
    branch: options.branch,
    commit_ref: options.commitRef,
    context: "production",
    id: "deploy-id",
    state: "ready",
    ...overrides,
  }
}

function createFetch(responses: unknown[]) {
  const calls: Array<{ method: string; url: string }> = []

  const fetch = async (
    input: string | URL | Request,
    init?: RequestInit,
  ): Promise<Response> => {
    calls.push({
      method: init?.method ?? "GET",
      url: String(input),
    })

    const body = responses.shift()
    assert.notEqual(body, undefined, "Unexpected fetch call")

    return new Response(JSON.stringify(body), {
      headers: { "content-type": "application/json" },
      status: 200,
    })
  }

  return Object.assign(fetch, { calls })
}
