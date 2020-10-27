import { FlickrSearch } from './flickr-search.po';

const SEARCH_TERM = 'flower';

/**
 * Test for the Flickr Search using the Selenium Promise manager
 */
describe('Flickr Search (using Promise manager)', () => {
  let page: FlickrSearch;

  beforeEach(() => {
    page = new FlickrSearch();
    page.navigateTo();
  });

  it('searches for a term', () => {
    page.searchFor(SEARCH_TERM);
    expect(page.photoItemLinks().count()).toBe(15);
    page.photoItemLinks().each((link) => {
      if (!link) {
        throw new Error('link is not defined');
      }
      expect(link.getAttribute('href')).toContain('https://www.flickr.com/photos/');
    });
    expect(page.photoItemImages().count()).toBe(15);
  });

  it('shows the full photo', () => {
    page.searchFor(SEARCH_TERM);
    page.photoItemLinks().first().click();
    expect(page.fullPhoto().getText()).toContain(SEARCH_TERM);
    expect(page.fullPhotoTitle().getText()).not.toBe('');
    expect(page.fullPhotoTags().getText()).not.toBe('');
  });
});
