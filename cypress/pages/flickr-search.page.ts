// tslint:disable-next-line: no-reference
/// <reference path="../support/index.d.ts" />

/**
 * Page object for the Flickr search
 */
export class FlickrSearch {
  public visit(): void {
    cy.visit('/');
  }

  public searchFor(term: string): void {
    cy.byTestId('search-term-input').first().clear().type(term);
    cy.byTestId('submit-search').first().click();
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
