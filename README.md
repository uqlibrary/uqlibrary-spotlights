# uqlibrary-spotlights

[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-spotlights.svg)](https://david-dm.org/uqlibrary/uqlibrary-spotlights)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-spotlights/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-spotlights?type=dev)

uqlibrary-spotlights is a simple image carousel that fetches current Spotlights from the API

Full documentation can be found at [GitHub Pages](http://uqlibrary.github.io/uqlibrary-spotlights).

### Getting Started
Install Node.JS and run the following oneliner in the project directory:
```sh
npm install -g bower && bower install
```

### Developing
- Please adhere to the Polymer code style guide provided at [Style Guide](http://polymerelements.github.io/style-guide/). 
- Colors and common styles are imported (bower install) from [uqlibrary-styles](http://github.com/uqlibrary/uqlibrary-styles).
- GitHub pages should be updated after every commit to Master by running the "generate-gh-pages.sh" in the /bin/ directory

### Testing
Tests are run using the Web Component Tester. Either navigate to /tests/index.html in a browser or using the command line:
```sh
wct --local all
```
