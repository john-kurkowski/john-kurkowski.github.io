# johnkurkowski.com

Source for [johnkurkowski.com](https://johnkurkowski.com).

## Development

### Install

    npm install

### Running

    npm start

### Tests

    npm test

Tests are run in CI and must pass before production deploy, i.e. pushes to
trunk. Branches deploy regardless of CI passing.

Before push, you can preview [Lost Pixel](https://app.lost-pixel.com/) VRT's
snapshots against your running local server in production mode.

    npm run build
    npm run preview &
    npx lost-pixel local
