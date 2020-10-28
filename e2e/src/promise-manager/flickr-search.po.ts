import {
  browser,
  ElementArrayFinder,
  ElementFinder,
  ExpectedConditions,
  promise,
} from 'protractor';

import { findEl, findEls } from '../e2e.spec-helper';

/**
 * Page object for the Flickr search using the Selenium Promise manager
 */
export class FlickrSearch {
  public navigateTo(): void {
    browser.get('/');
  }

  public searchFor(term: string): void {
    const input = findEls('searchTermInput').first();
    input.clear();
    input.sendKeys(term);
    findEls('submitSearch').first().click();
    browser.wait(ExpectedConditions.elementToBeClickable(this.photoItemLinks().first()));
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
