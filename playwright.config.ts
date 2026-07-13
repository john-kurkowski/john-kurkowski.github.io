import { createArgosReporterOptions } from "@argos-ci/playwright/reporter"
import { defineConfig, devices } from "@playwright/test"

const port = process.env.PLAYWRIGHT_PORT ?? "4321"
const baseURL = `http://localhost:${port}`

export default defineConfig({
  testDir: "./test/vrt",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      createArgosReporterOptions({ uploadToArgos: !!process.env.CI }),
    ],
  ],
  use: {
    ...devices["Desktop Chrome"],
    baseURL,
    channel: process.env.PLAYWRIGHT_CHANNEL,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  webServer: {
    command: `npm run preview -- --port ${port}`,
    reuseExistingServer: !process.env.CI,
    url: baseURL,
  },
})
