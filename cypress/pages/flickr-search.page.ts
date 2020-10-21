// tslint:disable-next-line: no-reference
/// <reference path="../support/index.d.ts" />

/**
 * Page object for the Flickr Search using the Selenium Promise manager
 */
export class FlickrSearch {
  public visit(): void {
    cy.visit('/');
  }

  public searchFor(term: string): void {
    const input = cy.byTestId('searchTermInput').first();
    input.clear();
    input.type(term);
    cy.byTestId('submitSearch').first().click();
  }

  public photoItemLinks(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.byTestId('photo-item-link');
  }

  public photoListImages(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.byTestId('image');
  }

  public fullPhoto(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.byTestId('full-photo');
  }

  public fullPhotoTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.byTestId('full-photo-title');
  }

  public fullPhotoImage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.byTestId('full-image');
  }

  public fullPhotoTags(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.byTestId('tags');
  }
}
