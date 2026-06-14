# johnkurkowski.com

Source for [johnkurkowski.com](https://johnkurkowski.com).

## Development

### Install

    npm install

Install Playwright browsers only if you plan to run browser-based tests locally.

    npx playwright install chromium

### Running

    npm start

### Tests

    npm test

Tests are run in CI and must pass before production deploy, i.e. pushes to
trunk. Branches deploy regardless of CI passing.

Before push, you can preview [Argos](https://argos-ci.com/) VRT's snapshots
against your built site in production mode.

    npm run build
    npm run test:vrt
