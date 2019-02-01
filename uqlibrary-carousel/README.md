# uqlibrary-carousel

[![Codeship Status for uqlibrary/uqlibrary-carousel](https://app.codeship.com/projects/263bd5b0-f7c0-0133-b916-3ad91afdcb85/status?branch=master)](https://codeship.com/projects/150741)
[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-carousel.svg)](https://david-dm.org/uqlibrary/uqlibrary-carousel)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-carousel/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-carousel?type=dev)

A simple, responsive, image slider (carousel) built and designed for Polymer. Only dependencies are Polymer elements.

## Demo

For a demo and full property rundown see [GH Pages](https://uqlibrary.github.io/uqlibrary-carousel/uqlibrary-carousel/).

## Getting Started

Install Node.JS and run the following:

```sh
npm install -g bower web-component-tester polymer-cli
npm install
bower install
```

### Developing

- Please adhere to the Polymer code style guide provided at [Style Guide](http://polymerelements.github.io/style-guide/).
- Colors and common styles are imported (bower install) from [uqlibrary-styles](http://github.com/uqlibrary/uqlibrary-styles).
- A preview of the component can be viewed locally by running `npm start`. Use the second URL from the command output.
- GitHub pages should be updated after every commit to `master` branch by running `bin/generate-gh-pages.sh`

## Usage

```sh
bower install uqlibrary/uqlibrary-carousel --save
```

- Add images via JS

```javascript
HTMLImports.whenReady(function () {
    var carousel = document.querySelector('uqlibrary-carousel');
    carousel.slides = [
        {
            link: "https://library.uq.edu.au/",
            image: {
                href: "https://lorempixel.com/800/300/abstract",
                description: "Test image"
            }
        }
    ]
});
```
