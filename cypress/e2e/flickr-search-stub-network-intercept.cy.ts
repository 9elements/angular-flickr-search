import {
  photo1,
  photo1Link,
  photos,
  searchTerm,
} from '../../src/app/spec-helpers/photo.spec-helper';

describe('Flickr search (with intercept network stubbing)', () => {
  const flickrResponse = {
    photos: {
      photo: photos,
    },
  };

  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://www.flickr.com/services/rest/*',
        query: {
          tags: searchTerm,
          method: 'flickr.photos.search',
          format: 'json',
          nojsoncallback: '1',
          tag_mode: 'all',
          media: 'photos',
          per_page: '15',
          extras: 'tags,date_taken,owner_name,url_q,url_m',
          api_key: '*',
        },
      },
      {
        body: flickrResponse,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    ).as('flickrSearchRequest');

    cy.visit('/');
  });

  it('searches for a term', () => {
    cy.byTestId('search-term-input').first().clear().type(searchTerm);
    cy.byTestId('submit-search').first().click();

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
    cy.byTestId('search-term-input').first().clear().type(searchTerm);
    cy.byTestId('submit-search').first().click();

    cy.wait('@flickrSearchRequest');

    cy.byTestId('photo-item-link').first().click();
    cy.byTestId('full-photo').should('contain', searchTerm);
    cy.byTestId('full-photo-title').should('have.text', photo1.title);
    cy.byTestId('full-photo-tags').should('have.text', photo1.tags);
    cy.byTestId('full-photo-image').should('have.attr', 'src', photo1.url_m);
    cy.byTestId('full-photo-link').should('have.attr', 'href', photo1Link);
  });
});
