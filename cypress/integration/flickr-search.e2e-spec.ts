import { FlickrSearch } from '../pages/flickr-search.page';

const SEARCH_TERM = 'flower';

describe('Flickr Search', () => {
  let page: FlickrSearch;

  beforeEach(() => {
    page = new FlickrSearch();
    page.visit();
  });

  it('searches for a term', () => {
    page.searchFor(SEARCH_TERM);
    const photoItemLinks = page.photoItemLinks();
    photoItemLinks.should('have.length', 15);
    photoItemLinks.each((link) => {
      expect(link.attr('href')).to.contain('https://www.flickr.com/photos/');
    });
    page.photoListImages().should('have.length', 15);
  });

  it('shows the image detail', () => {
    page.searchFor(SEARCH_TERM);
    page.photoItemLinks().first().click();
    page.fullPhoto().should('contain', SEARCH_TERM);
    const fullPhotoTitle = page.fullPhotoTitle();
    fullPhotoTitle.should('exist');
    fullPhotoTitle.should('not.have.text', '');
    page.fullPhotoTags().should('not.have.text', '');
  });
});
