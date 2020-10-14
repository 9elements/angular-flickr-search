import { FlickrSearch } from './flickr-search.po';

const SEARCH_TERM = 'flower';

describe('workspace-project App', () => {
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
    expect(page.photoListImages().count()).toBe(15);
  });

  it('shows the image detail', () => {
    page.searchFor(SEARCH_TERM);
    page.photoItemLinks().first().click();
    expect(page.fullPhoto().getText()).toContain(SEARCH_TERM);
    const fullPhotoTitle = page.fullPhotoTitle();
    expect(fullPhotoTitle.isPresent()).toBe(true);
    expect(fullPhotoTitle.getText()).not.toBe('');
    expect(page.fullPhotoTags().getText()).not.toBe('');
  });
});
