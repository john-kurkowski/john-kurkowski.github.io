# johnkurkowski.com

Source for [johnkurkowski.com](https://johnkurkowski.com).

## Development

### Install

    npm install

### Running

    npm start

### Tests

    npm test

Tests are run in GitHub Actions and must pass before production deploys.

[Lost Pixel](https://app.lost-pixel.com/) visual regression review is run during
CI and must pass before production deploys. Netlify deploy previews run build
only; production deploys are published by GitHub Actions after tests and visual
regression pass. Before push, you can preview Lost Pixel's snapshots against
your running local server in production mode.

    npm run build
    npm run preview &
    npx lost-pixel local
