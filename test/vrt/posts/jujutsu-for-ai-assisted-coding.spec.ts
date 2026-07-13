import { expect, test } from "@playwright/test"

test("matches the command block to the log terminal", async ({ page }) => {
  await page.goto("/posts/jujutsu-for-ai-assisted-coding/")

  const commandTerminal = page.locator("[data-jj-terminal-code] .astro-code")
  const logTerminal = page.locator("[data-jj-terminal]").first()
  const [commandSurface, logSurface] = await Promise.all(
    [commandTerminal, logTerminal].map((terminal) =>
      terminal.evaluate((element) => {
        const style = getComputedStyle(element)
        return {
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
        }
      }),
    ),
  )
  expect(commandSurface).toEqual(logSurface)
  expect(commandSurface).toEqual({
    backgroundColor: "rgb(40, 44, 52)",
    borderColor: "rgb(62, 68, 81)",
  })
  await expect(commandTerminal).toHaveText(
    "# Equivalent to squash merge in the GitHub GUI\n" +
      "jj squash --from main..parser --onto main  # opens $EDITOR for combined commit message\n" +
      "jj bookmark set main --revision pp         # say `pp` is the squash merge commit atop `main`\n\n" +
      "# Restack parser-api and all its descendants, including the exploratory branches\n" +
      "jj rebase --branch parser-api --onto main\n" +
      "jj git push",
  )

  const commandTokenColors = await commandTerminal
    .locator("span")
    .evaluateAll(
      (tokens) =>
        new Set(tokens.map((token) => getComputedStyle(token).color)).size,
    )
  expect(commandTokenColors).toBeGreaterThan(1)
})

test("switches among authentic stacked-diff states", async ({ page }) => {
  await page.goto("/posts/jujutsu-for-ai-assisted-coding/")

  const before = page.getByRole("radio", { name: "Before", exact: true })
  const squashMerged = page.getByRole("radio", {
    name: "Squash merged",
    exact: true,
  })
  const restacked = page.getByRole("radio", {
    name: "Restacked",
    exact: true,
  })

  await expect(before).toBeChecked()
  await expect(page.getByRole("status")).toHaveText("Showing: Before")
  const beforePanel = page.locator('[data-state-panel][data-state-index="0"]')
  await expect(
    beforePanel.getByRole("heading", { level: 3, name: "1. Before" }),
  ).toBeVisible()
  await expect(beforePanel.locator(".jj-terminal-heading p")).toHaveText(
    "the working copy is atop main; side branches leave parser-api and parser-errors.",
  )
  await expect(beforePanel).toContainText("@ vvswrqzl")
  await expect(beforePanel).toContainText("main 07608bfd")
  await expect(beforePanel).toContainText("parser-integration 539f299c")
  await expect(beforePanel).toContainText("Prototype streaming parser")
  await expect(beforePanel).toContainText("Benchmark streaming parser")
  await expect(beforePanel).toContainText("Try structured errors")
  await expect(beforePanel).toContainText("Harden CI")
  await expect(beforePanel).toContainText("Update dependencies")
  await expect(beforePanel).not.toContainText("$ jj log")
  expect(
    await beforePanel.locator('[data-token="bookmark"]').allTextContents(),
  ).toEqual([
    "main",
    "parser-integration",
    "parser-errors",
    "parser-validation",
    "parser-api",
    "parser",
  ])

  const authorColor = await beforePanel
    .locator('[data-token="author"]')
    .first()
    .evaluate((element) => getComputedStyle(element).color)
  const timestampColor = await beforePanel
    .locator('[data-token="timestamp"]')
    .first()
    .evaluate((element) => getComputedStyle(element).color)
  expect(authorColor).not.toBe(timestampColor)

  await squashMerged.press("Space")
  await expect(squashMerged).toBeChecked()
  await expect(page.getByRole("status")).toHaveText("Showing: Squash merged")
  const squashMergedPanel = page.locator(
    '[data-state-panel][data-state-index="1"]',
  )
  await expect(squashMergedPanel).toContainText("@ ywqxywyv")
  await expect(squashMergedPanel).toContainText("main ca55ec0d")

  await restacked.click()
  await expect(restacked).toBeChecked()
  await expect(page.getByRole("status")).toHaveText("Showing: Restacked")
  const restackedPanel = page.locator(
    '[data-state-panel][data-state-index="2"]',
  )
  await expect(restackedPanel).toContainText("@ ywqxywyv")
  await expect(restackedPanel).toContainText("parser-integration fbe0e86d")
  await expect(restackedPanel).toContainText("main ca55ec0d")
  expect(
    await restackedPanel.locator('[data-token="bookmark"]').allTextContents(),
  ).toEqual([
    "parser-integration",
    "parser-errors",
    "parser-validation",
    "parser-api",
    "main",
    "parser",
  ])
})

test("clips log-line view-transition snapshots at the log boundary", async ({
  page,
}) => {
  await page.goto("/posts/jujutsu-for-ai-assisted-coding/")

  const transitionStyles = await page.evaluate(async () => {
    if (!document.startViewTransition) return

    const line = document.querySelector<HTMLElement>(".jj-log-line")
    if (!line) throw new Error("Expected a Jujutsu log line")

    const transition = document.startViewTransition(() => {})
    await transition.ready
    const transitionName = line.style.getPropertyValue("--jj-line-transition")
    const styles = {
      lineOverflow: getComputedStyle(
        document.documentElement,
        `::view-transition-group(${transitionName})`,
      ).overflow,
      logOverflow: getComputedStyle(
        document.documentElement,
        "::view-transition-group(jj-log)",
      ).overflow,
    }
    await transition.finished
    return styles
  })

  test.skip(transitionStyles === undefined, "View Transitions are unavailable")
  expect(transitionStyles).toEqual({
    lineOverflow: "visible",
    logOverflow: "clip",
  })
})

test("does not start a view transition when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.addInitScript(() => {
    Object.defineProperty(document, "startViewTransition", {
      configurable: true,
      value: (update: () => void) => {
        window.viewTransitionCalls += 1
        update()
        return { finished: Promise.resolve() }
      },
    })
    window.viewTransitionCalls = 0
  })
  await page.goto("/posts/jujutsu-for-ai-assisted-coding/")

  await page.getByRole("radio", { name: "Squash merged", exact: true }).click()

  await expect(
    page.locator('[data-state-panel][data-state-index="1"]'),
  ).toBeVisible()
  expect(await page.evaluate(() => window.viewTransitionCalls)).toBe(0)
})

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false })

  test("shows all three states as static content", async ({ page }) => {
    await page.goto("/posts/jujutsu-for-ai-assisted-coding/")

    await expect(page.locator("[data-controls]")).toBeHidden()
    await expect(
      page.locator('[data-state-panel][data-state-index="0"]'),
    ).toBeVisible()
    await expect(
      page.locator('[data-state-panel][data-state-index="1"]'),
    ).toBeVisible()
    await expect(
      page.locator('[data-state-panel][data-state-index="2"]'),
    ).toBeVisible()
  })
})

declare global {
  interface Window {
    viewTransitionCalls: number
  }
}
