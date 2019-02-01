# uqlibrary-spotlights

[![Codeship Status for uqlibrary/uqlibrary-spotlights](https://app.codeship.com/projects/92b57c90-0804-0137-6d67-4e4c6d436a14/status?branch=master)](https://app.codeship.com/projects/325962)
[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-spotlights.svg)](https://david-dm.org/uqlibrary/uqlibrary-spotlights)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-spotlights/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-spotlights?type=dev)

uqlibrary-spotlights is a simple image carousel that fetches current Spotlights from the API

Full documentation can be found at [GitHub Pages](http://uqlibrary.github.io/uqlibrary-spotlights/uqlibrary-spotlights/).

## Getting Started

Install Node.JS and run the following:

```sh
npm install -g bower web-component-tester polymer-cli
npm install
bower install
```

## Developing

- Please adhere to the Polymer code style guide provided at [Style Guide](http://polymerelements.github.io/style-guide/).
- Colors and common styles are imported (bower install) from [uqlibrary-styles](http://github.com/uqlibrary/uqlibrary-styles).
- A preview of the component can be viewed locally by running `npm start`. Use the second URL from the command output.
- GitHub pages should be updated after every commit to `master` branch by running `bin/generate-gh-pages.sh`

## Testing

Tests are run using the Web Component Tester.

```sh
npm test
```
