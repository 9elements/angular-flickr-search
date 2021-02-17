import { browser, ExpectedConditions } from 'protractor';
import { findEl, findEls } from './e2e.spec-helper';

/**
 * Test for the Flickr search without page object using async/await
 */
describe('Flickr search (starter using async/await)', () => {
  beforeEach(async () => {
    browser.waitForAngularEnabled(false);
    await browser.get('/');
  });

  it('searches for a term', async () => {
    const input = findEl('search-term-input');
    await input.clear();
    await input.sendKeys('flower');
    await findEl('submit-search').click();

    const links = findEls('photo-item-link');
    await browser.wait(ExpectedConditions.elementToBeClickable(links.first()));
    expect(await links.count()).toBe(15);
    await links.each(async (link) => {
      if (!link) {
        throw new Error('link is not defined');
      }
      expect(await link.getAttribute('href')).toContain('https://www.flickr.com/photos/');
    });

    expect(await findEls('photo-item-image').count()).toBe(15);
  });

  it('shows the full photo', async () => {
    const input = findEl('search-term-input');
    await input.clear();
    await input.sendKeys('flower');
    await findEl('submit-search').click();

    const link = findEls('photo-item-link').first();
    await browser.wait(ExpectedConditions.elementToBeClickable(link));
    await link.click();

    expect(await findEl('full-photo').getText()).toContain('flower');
    expect(await findEl('full-photo-title').getText()).not.toBe('');
    expect(await findEl('full-photo-tags').getText()).not.toBe('');
    expect(await findEl('full-photo-image').isPresent()).toBe(true);
  });
});
