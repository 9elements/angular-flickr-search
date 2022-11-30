# Flickr Search – Angular example application

📖 This example is part of the **[free online book: Testing Angular – A Guide to Robust Angular Applications
](https://testing-angular.com/)**. 📖

This is an Angular example application implementing a Flickr photo search. There is one version with plain Angular and one version with [NgRx](https://ngrx.io/).

The application is fully tested with unit and end-to-end tests.

Unit tests are written in plain Angular using `TestBed` and additionally using [Spectator](https://github.com/ngneat/spectator).

End-to-end tests are written with [Cypress](https://www.cypress.io/) and also with [Protractor](http://www.protractortest.org/).

**[App structure plan (React version)](https://github.com/molily/learning-react/tree/main/5-flickr-search)**

Other versions:

- [Flickr Search with React](https://github.com/molily/learning-react/tree/main/5-flickr-search)
- [Flickr Search with React and Redux](https://github.com/molily/learning-react/tree/main/7-flickr-search-redux)
- [Flickr Search with jQuery](https://molily.de/javascript-introduction/flickr-jquery.html)
- [Flickr Search with Backbone](https://molily.de/javascript-introduction/flickr-backbone.html)
- [Source code for the jQuery and Backbone versions](https://github.com/molily/molily.de/tree/main/javascript-introduction)

## Terms of Use

This non-commercial example application uses the Flickr API but is not endorsed or certified by Flickr Inc. or SmugMug, Inc. See the [Flickr API Terms of Use](https://www.flickr.com/help/terms/api).

The code contains a Flickr API key that is bound to the example application. If you wish to use the Flickr API in your application, you need to [Request an API Key](https://www.flickr.com/services/apps/create/) yourself.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit & integration tests

Run `ng test` to execute the unit & integration tests with Karma and Jasmine.

## Running end-to-end tests

### Cypress

Run `ng run flickr-search:cypress-run` to execute the Cypress end-to-end tests. (This starts the development server automatically.)

Run `ng run flickr-search:cypress-open` to start the interactive Cypress test runner.

### Protractor

Start the development server first. Then run `npm run protractor` to execute the Protractor end-to-end tests.

It might be necessary to download the browser drivers before:

```
npx webdriver-manager update
```

## Deployment

Run `npm run deploy` to the deploy the code to [https://9elements.github.io/angular-flickr-search/].
