# Flickr Search – Angular example application

This is an Angular example application implementing a Flickr photo search. There is one version with plain Angular and one version with [NgRx](https://ngrx.io/).

The application is fully tested with unit and end-to-end tests.

Unit tests are written in plain Angular using `TestBed` and additionally using [Spectator](https://github.com/ngneat/spectator).

End-to-end tests are written with [Cypress](https://www.cypress.io/) and also with [Protractor](http://www.protractortest.org/).

**[App structure plan (React version)](https://github.com/molily/learning-react/tree/master/5-flickr-search)**

Other versions:

- [Flickr Search with React](https://github.com/molily/learning-react/tree/master/5-flickr-search)
- [Flickr Search with React and Redux](https://github.com/molily/learning-react/tree/master/7-flickr-search-redux)
- [Flickr Search with jQuery](https://molily.de/javascript-introduction/flickr-jquery.html)
- [Flickr Search with Backbone](https://molily.de/javascript-introduction/flickr-backbone.html)
- [Source code for the jQuery and Backbone versions](https://github.com/molily/molily.de/tree/master/javascript-introduction)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

### Cypress

Run `ng run flickr-search:cypress-run` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).

Run `ng run flickr-search:cypress-open` to start the interactive Cypress test runner.

### Protractor

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
