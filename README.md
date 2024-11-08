# johnkurkowski.com

Source for [johnkurkowski.com](https://johnkurkowski.com).

## Development

### Install

    npm install

### Running

    npm start

### Tests

    npm test

Tests are run in CI and must pass prior to deployment.

[Lost Pixel](https://app.lost-pixel.com/) visual regression review is run during
CI, but does not block deployment. If there are visual differences in your
build, they require manual, asynchronous review. Before push, you can preview
Lost Pixel's snapshots against your running local server in production mode.

    npm run build
    npm run serve &
    npx lost-pixel local
