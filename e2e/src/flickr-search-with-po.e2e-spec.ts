import { browser } from 'protractor';
import { FlickrSearch } from './flickr-search.po';

const searchTerm = 'flower';

/**
 * Test for the Flickr search uusing async/await
 */
describe('Flickr search (using async/await)', () => {
  let page: FlickrSearch;

  beforeEach(async () => {
    browser.waitForAngularEnabled(false);
    page = new FlickrSearch();
    await page.navigateTo();
  });

  it('searches for a term', async () => {
    await page.searchFor(searchTerm);
    const links = page.photoItemLinks();
    expect(await links.count()).toBe(15);
    await links.each(async (link) => {
      if (!link) {
        throw new Error('link is not defined');
      }
      expect(await link.getAttribute('href')).toContain('https://www.flickr.com/photos/');
    });
    expect(await page.photoItemImages().count()).toBe(15);
  });

  it('shows the full photo', async () => {
    await page.searchFor(searchTerm);
    await page.photoItemLinks().first().click();
    expect(await page.fullPhotoText()).toContain(searchTerm);
    expect(await page.fullPhotoTitle()).not.toBe('');
    expect(await page.fullPhotoTags()).not.toBe('');
    expect(await page.fullPhotoImage().isPresent()).toBe(true);
  });
});
