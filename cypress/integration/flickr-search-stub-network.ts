describe('Flickr search (with network stubbing)', () => {
  const photos = [
    {
      id: '50179462511',
      title: 'Blauflügel-Prachtlibelle (Calopteryx virgo) (1)',
      url_q: 'https://live.staticflickr.com/65535/50179462511_0752249fba_q.jpg',
      url_m: 'https://live.staticflickr.com/65535/50179462511_0752249fba_m.jpg',
      datetaken: '2020-06-21T15:16:07-08:00',
      owner: '12639178@N07',
      ownername: 'naturgucker.de',
      tags: 'ngidn2020772215 calopteryxvirgo blauflügelprachtlibelle',
    },
    {
      id: '50178927498',
      title: 'Blauflügel-Prachtlibelle (Calopteryx virgo) (2)',
      url_q: 'https://live.staticflickr.com/65535/50178927498_44162cb1a0_q.jpg',
      url_m: 'https://live.staticflickr.com/65535/50178927498_44162cb1a0_m.jpg',
      datetaken: '2020-06-21T15:16:17-08:00',
      owner: '12639178@N07',
      ownername: 'naturgucker.de',
      tags: 'ngid657236235 calopteryxvirgo blauflügelprachtlibelle',
    },
  ];
  const flickrResponse = {
    photos: {
      photo: photos,
    },
  };

  const SEARCH_TERM = 'Calopteryx';

  beforeEach(() => {
    cy.visit('/');

    cy.route2(
      {
        method: 'GET',
        url: 'https://www.flickr.com/services/rest/',
        query: {
          method: 'flickr.photos.search',
          format: 'json',
          nojsoncallback: '1',
          tags: SEARCH_TERM,
          tag_mode: 'all',
          media: 'photos',
          per_page: '15',
          extras: 'tags,date_taken,owner_name,url_q,url_m',
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
    const input = cy.byTestId('searchTermInput').first();
    input.clear();
    input.type(SEARCH_TERM);
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
    const input = cy.byTestId('searchTermInput').first();
    input.clear();
    input.type(SEARCH_TERM);
    cy.byTestId('submitSearch').first().click();

    const photo = photos[0];
    cy.byTestId('photo-item-link').first().click();
    cy.byTestId('full-photo').should('contain', SEARCH_TERM);
    cy.byTestId('full-photo-title').should('have.text', photo.title);
    cy.byTestId('full-photo-tags').should('have.text', photo.tags);
    cy.byTestId('full-photo-image').should('have.attr', 'src', photo.url_m);
    cy.byTestId('full-photo-link').should(
      'have.attr',
      'href',
      `https://www.flickr.com/photos/${photo.owner}/${photo.id}`,
    );
  });
});
