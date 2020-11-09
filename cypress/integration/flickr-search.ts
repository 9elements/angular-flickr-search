describe('Flickr search', () => {
  const SEARCH_TERM = 'flower';

  beforeEach(() => {
    cy.visit('/');
  });

  it('searches for a term', () => {
    const input = cy.byTestId('searchTermInput').first();
    input.clear();
    input.type(SEARCH_TERM);
    cy.byTestId('submitSearch').first().click();

    cy.byTestId('photo-item-link')
      .should('have.length', 15)
      .each((link) => {
        expect(link.attr('href')).to.contain('https://www.flickr.com/photos/');
      });
    cy.byTestId('photo-item-image').should('have.length', 15);
  });

  it('shows the full photo', () => {
    const input = cy.byTestId('searchTermInput').first();
    input.clear();
    input.type(SEARCH_TERM);
    cy.byTestId('submitSearch').first().click();

    cy.byTestId('photo-item-link').first().click();
    cy.byTestId('full-photo').should('contain', SEARCH_TERM);
    cy.byTestId('full-photo-title').should('not.have.text', '');
    cy.byTestId('full-photo-tags').should('not.have.text', '');
    cy.byTestId('full-photo-image').should('exist');
  });
});
