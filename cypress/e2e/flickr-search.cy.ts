describe('Flickr search', () => {
  const searchTerm = 'flower';

  beforeEach(() => {
    cy.visit('/');
  });

  it('searches for a term', () => {
    cy.byTestId('search-term-input').first().clear().type(searchTerm);
    cy.byTestId('submit-search').first().click();

    cy.byTestId('photo-item-link')
      .should('have.length', 15)
      .each((link) => {
        expect(link.attr('href')).to.contain('https://www.flickr.com/photos/');
      });
    cy.byTestId('photo-item-image').should('have.length', 15);
  });

  it('shows the full photo', () => {
    cy.byTestId('search-term-input').first().clear().type(searchTerm);
    cy.byTestId('submit-search').first().click();

    cy.byTestId('photo-item-link').first().click();
    cy.byTestId('full-photo').should('contain', searchTerm);
    cy.byTestId('full-photo-title').should('not.have.text', '');
    cy.byTestId('full-photo-tags').should('not.have.text', '');
    cy.byTestId('full-photo-image').should('exist');
  });
});
