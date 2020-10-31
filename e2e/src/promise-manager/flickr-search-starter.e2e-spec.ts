import { browser, ExpectedConditions } from 'protractor';
import { findEl, findEls } from '../e2e.spec-helper';

/**
 * Test for the Flickr search without page object using the Selenium Promise manager
 */
describe('Flickr search (starter)', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('searches for a term', () => {
    const input = findEl('searchTermInput');
    input.clear();
    input.sendKeys('flower');
    findEl('submitSearch').click();

    const links = findEls('photo-item-link');
    browser.wait(ExpectedConditions.elementToBeClickable(links.first()));
    expect(links.count()).toBe(15);
    links.each((link) => {
      if (!link) {
        throw new Error('link is not defined');
      }
      expect(link.getAttribute('href')).toContain('https://www.flickr.com/photos/');
    });

    expect(findEls('photo-item-image').count()).toBe(15);
  });

  it('shows the full photo', async () => {
    const input = findEl('searchTermInput');
    input.clear();
    input.sendKeys('flower');
    findEl('submitSearch').click();

    const link = findEls('photo-item-link').first();
    browser.wait(ExpectedConditions.elementToBeClickable(link));
    link.click();

    expect(findEl('full-photo').getText()).toContain('flower');
    expect(findEl('full-photo-title').getText()).not.toBe('');
    expect(findEl('full-photo-tags').getText()).not.toBe('');
    expect(findEl('full-photo-image').isPresent()).toBe(true);
  });
});
