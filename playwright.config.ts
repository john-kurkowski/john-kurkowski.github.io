import { createArgosReporterOptions } from "@argos-ci/playwright/reporter"
import { defineConfig, devices } from "@playwright/test"

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
    baseURL: "http://localhost:4321",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run preview",
    reuseExistingServer: !process.env.CI,
    url: "http://localhost:4321",
  },
})
