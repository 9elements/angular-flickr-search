// tslint:disable-next-line: no-reference
/// <reference path="../support/index.d.ts" />

/**
 * Page object for the Flickr search using the Selenium Promise manager
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

  public photoItemImages(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.byTestId('photo-item-image');
  }

  public fullPhoto(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.byTestId('full-photo');
  }

  public fullPhotoTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.byTestId('full-photo-title');
  }

  public fullPhotoTags(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.byTestId('full-photo-tags');
  }

  public fullPhotoImage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.byTestId('full-photo-image');
  }
}
