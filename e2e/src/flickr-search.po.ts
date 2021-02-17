import {
  browser,
  ElementArrayFinder,
  ElementFinder,
  ExpectedConditions,
  promise,
} from 'protractor';

import { findEl, findEls } from './e2e.spec-helper';

/**
 * Page object for the Flickr search using async/await
 */
export class FlickrSearch {
  public async navigateTo(): Promise<any> {
    await browser.get('/');
  }

  public async searchFor(term: string): Promise<void> {
    const input = findEls('search-term-input').first();
    await input.clear();
    await input.sendKeys(term);
    await findEls('submit-search').first().click();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.photoItemLinks().first()),
    );
  }

  public photoItemLinks(): ElementArrayFinder {
    return findEls('photo-item-link');
  }

  public photoItemImages(): ElementArrayFinder {
    return findEls('photo-item-image');
  }

  public fullPhotoText(): promise.Promise<string> {
    return findEl('full-photo').getText();
  }

  public fullPhotoTitle(): promise.Promise<string> {
    return findEl('full-photo-title').getText();
  }

  public fullPhotoTags(): promise.Promise<string> {
    return findEl('full-photo-tags').getText();
  }

  public fullPhotoImage(): ElementFinder {
    return findEl('full-photo-image');
  }
}
