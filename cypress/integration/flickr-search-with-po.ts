import { FlickrSearch } from '../pages/flickr-search.page';

describe('Flickr search (with page object)', () => {
  const SEARCH_TERM = 'flower';

  let page: FlickrSearch;

  beforeEach(() => {
    page = new FlickrSearch();
    page.visit();
  });

  it('searches for a term', () => {
    page.searchFor(SEARCH_TERM);
    page
      .photoItemLinks()
      .should('have.length', 15)
      .each((link) => {
        expect(link.attr('href')).to.contain('https://www.flickr.com/photos/');
      });
    page.photoItemImages().should('have.length', 15);
  });

  it('shows the full photo', () => {
    page.searchFor(SEARCH_TERM);
    page.photoItemLinks().first().click();
    page.fullPhoto().should('contain', SEARCH_TERM);
    page.fullPhotoTitle().should('not.have.text', '');
    page.fullPhotoTags().should('not.have.text', '');
    page.fullPhotoImage().should('exist');
  });
});
