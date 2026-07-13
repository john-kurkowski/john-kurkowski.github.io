/**
 * Generates the article's SEO image from the production stacked-diff component.
 * A temporary route supplies the capture-only canvas while the script builds,
 * serves, screenshots, and then removes that route even when capture fails.
 */
import { type ChildProcess, spawn } from "node:child_process"
import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { createServer } from "node:net"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { type Browser, chromium } from "@playwright/test"

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(scriptDirectory, "../../..")
const captureRoute = join(
  projectRoot,
  "src/pages/jj-stack-capture-temporary.astro",
)
const captureTemplate = join(scriptDirectory, "StackedDiffCapture.astro")
const templateComponentImport =
  "../../../src/components/posts/jujutsu-for-ai-assisted-coding/StackedDiff.astro"
const routeComponentImport =
  "../components/posts/jujutsu-for-ai-assisted-coding/StackedDiff.astro"
const outputDirectory = join(
  projectRoot,
  "src/content/posts/2026-07-12-jujutsu-for-ai-assisted-coding",
)
const frames = [
  { file: "01-before.png", panel: "jj-stack-before", stateIndex: 0 },
]

async function availablePort(): Promise<number> {
  const server = createServer()
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject)
    server.listen(0, "127.0.0.1", resolve)
  })
  const address = server.address()
  const port = typeof address === "object" && address ? address.port : undefined
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()))
  })
  if (!port) {
    throw new Error("Could not reserve a local capture port")
  }
  return port
}

async function waitForServer(url: string, child: ChildProcess): Promise<void> {
  const deadline = Date.now() + 30_000
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Astro exited before serving ${url}`)
    }
    try {
      const response = await fetch(url)
      if (response.ok) {
        return
      }
    } catch {
      // The development server is still starting.
    }
    await new Promise<void>((resolve) => setTimeout(resolve, 100))
  }
  throw new Error(`Timed out waiting for ${url}`)
}

async function runCommand(command: string, args: string[]): Promise<void> {
  const child = spawn(command, args, {
    cwd: projectRoot,
    env: process.env,
    stdio: "inherit",
  })
  const exitCode = await new Promise<number | null>((resolve, reject) => {
    child.once("error", reject)
    child.once("exit", resolve)
  })
  if (exitCode !== 0) {
    throw new Error(`${command} ${args.join(" ")} exited with ${exitCode}`)
  }
}

async function stopProcess(child: ChildProcess): Promise<void> {
  if (child.exitCode !== null) {
    return
  }
  child.kill("SIGTERM")
  await Promise.race([
    new Promise<void>((resolve) => child.once("exit", () => resolve())),
    new Promise<void>((resolve) => setTimeout(resolve, 5_000)),
  ])
  if (child.exitCode === null) {
    child.kill("SIGKILL")
  }
}

async function installCaptureRoute(): Promise<void> {
  const template = await readFile(captureTemplate, "utf8")
  const route = template.replace(templateComponentImport, routeComponentImport)
  if (route === template) {
    throw new Error("Capture template component import was not found")
  }
  await writeFile(captureRoute, route)
}

await mkdir(outputDirectory, { recursive: true })
await installCaptureRoute()

let browser: Browser | undefined
let preview: ChildProcess | undefined
try {
  await runCommand("npm", ["run", "build"])
  const port = await availablePort()
  const url = `http://127.0.0.1:${port}/jj-stack-capture-temporary/`
  preview = spawn("npm", ["run", "preview", "--", "--port", String(port)], {
    cwd: projectRoot,
    env: process.env,
    stdio: "inherit",
  })
  await waitForServer(url, preview)
  const channel = process.env.PLAYWRIGHT_CHANNEL
  browser = await chromium.launch(channel ? { channel } : {})
  const context = await browser.newContext({
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    viewport: { height: 630, width: 1200 },
  })

  for (const frame of frames) {
    const page = await context.newPage()
    await page.addInitScript(() => {
      Object.defineProperty(document, "startViewTransition", {
        configurable: true,
        value: undefined,
      })
    })
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto(url, { waitUntil: "networkidle" })
    await page.evaluate(() => document.fonts.ready)
    await page.evaluate((stateIndex) => {
      document
        .querySelector<HTMLButtonElement>(
          `button[data-state-index="${stateIndex}"]`,
        )
        ?.click()
    }, frame.stateIndex)
    await page.locator(`#${frame.panel}`).waitFor({ state: "visible" })
    const captureMetrics = await page
      .locator(`#${frame.panel}`)
      .evaluate((panel) => {
        const lastLine = panel.querySelector<HTMLElement>(
          ".jj-log-line:last-child",
        )
        const log = panel.querySelector<HTMLElement>(".jj-log")
        return {
          bottom: lastLine?.getBoundingClientRect().bottom,
          fontSize: log ? getComputedStyle(log).fontSize : undefined,
          lineHeight: log ? getComputedStyle(log).lineHeight : undefined,
        }
      })
    if (!captureMetrics.bottom || captureMetrics.bottom > 630) {
      throw new Error(
        `${frame.file} does not fit within the 1200×630 canvas: ${JSON.stringify(captureMetrics)}`,
      )
    }
    await page.screenshot({
      animations: "disabled",
      path: join(outputDirectory, frame.file),
      type: "png",
    })
    await page.close()
  }
} finally {
  await browser?.close()
  if (preview) {
    await stopProcess(preview)
  }
  await rm(captureRoute, { force: true })
}

for (const frame of frames) {
  process.stdout.write(`${join(outputDirectory, frame.file)}\n`)
}
