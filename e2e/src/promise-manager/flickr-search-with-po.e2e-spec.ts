import { FlickrSearch } from './flickr-search.po';

const searchTerm = 'flower';

/**
 * Test for the Flickr search using the Selenium Promise manager
 */
describe('Flickr search (using Promise manager)', () => {
  let page: FlickrSearch;

  beforeEach(() => {
    page = new FlickrSearch();
    page.navigateTo();
  });

  it('searches for a term', () => {
    page.searchFor(searchTerm);
    const links = page.photoItemLinks();
    expect(links.count()).toBe(15);
    links.each((link) => {
      if (!link) {
        throw new Error('link is not defined');
      }
      expect(link.getAttribute('href')).toContain('https://www.flickr.com/photos/');
    });
    expect(page.photoItemImages().count()).toBe(15);
  });

  it('shows the full photo', () => {
    page.searchFor(searchTerm);
    page.photoItemLinks().first().click();
    expect(page.fullPhotoText()).toContain(searchTerm);
    expect(page.fullPhotoTitle()).not.toBe('');
    expect(page.fullPhotoTags()).not.toBe('');
    expect(page.fullPhotoImage().isPresent()).toBe(true);
  });
});
