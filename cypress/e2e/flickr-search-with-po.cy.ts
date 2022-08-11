import { FlickrSearch } from '../pages/flickr-search.page';

describe('Flickr search (with page object)', () => {
  const searchTerm = 'flower';

  let page: FlickrSearch;

  beforeEach(() => {
    page = new FlickrSearch();
    page.visit();
  });

  it('searches for a term', () => {
    page.searchFor(searchTerm);
    page
      .photoItemLinks()
      .should('have.length', 15)
      .each((link) => {
        expect(link.attr('href')).to.contain('https://www.flickr.com/photos/');
      });
    page.photoItemImages().should('have.length', 15);
  });

  it('shows the full photo', () => {
    page.searchFor(searchTerm);
    page.photoItemLinks().first().click();
    page.fullPhoto().should('contain', searchTerm);
    page.fullPhotoTitle().should('not.have.text', '');
    page.fullPhotoTags().should('not.have.text', '');
    page.fullPhotoImage().should('exist');
  });
});
