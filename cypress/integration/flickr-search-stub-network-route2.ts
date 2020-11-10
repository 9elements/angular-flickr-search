import {
  photo1,
  photo1Link,
  photos,
  searchTerm,
} from '../../src/app/spec-helpers/photo.spec-helper';

describe('Flickr search (with route2 network stubbing)', () => {
  const flickrResponse = {
    photos: {
      photo: photos,
    },
  };

  beforeEach(() => {
    cy.visit('/');

    cy.route2(
      {
        method: 'GET',
        url: 'https://www.flickr.com/services/rest/',
        query: {
          tags: searchTerm,
          method: 'flickr.photos.search',
          format: 'json',
          nojsoncallback: '1',
          tag_mode: 'all',
          media: 'photos',
          per_page: '15',
          extras: 'tags,date_taken,owner_name,url_q,url_m',
          // Omit api_key, it is likely to change
        },
      },
      {
        body: flickrResponse,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    ).as('flickrSearchRequest');
  });

  it('searches for a term', () => {
    cy.byTestId('searchTermInput').first().clear().type(searchTerm);
    cy.byTestId('submitSearch').first().click();

    cy.wait('@flickrSearchRequest');

    cy.byTestId('photo-item-link')
      .should('have.length', 2)
      .each((link, index) => {
        expect(link.attr('href')).to.equal(
          `https://www.flickr.com/photos/${photos[index].owner}/${photos[index].id}`,
        );
      });
    cy.byTestId('photo-item-image')
      .should('have.length', 2)
      .each((image, index) => {
        expect(image.attr('src')).to.equal(photos[index].url_q);
      });
  });

  it('shows the full photo', () => {
    cy.byTestId('searchTermInput').first().clear().type(searchTerm);
    cy.byTestId('submitSearch').first().click();

    cy.wait('@flickrSearchRequest');

    cy.byTestId('photo-item-link').first().click();
    cy.byTestId('full-photo').should('contain', searchTerm);
    cy.byTestId('full-photo-title').should('have.text', photo1.title);
    cy.byTestId('full-photo-tags').should('have.text', photo1.tags);
    cy.byTestId('full-photo-image').should('have.attr', 'src', photo1.url_m);
    cy.byTestId('full-photo-link').should('have.attr', 'href', photo1Link);
  });
});
