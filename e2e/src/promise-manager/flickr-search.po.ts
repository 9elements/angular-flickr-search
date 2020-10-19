import {
  browser,
  ElementArrayFinder,
  ElementFinder,
  ExpectedConditions,
} from 'protractor';

import { findEl, findEls } from '../e2e.spec-helper';

/**
 * Page object for the Flickr Search using the Selenium Promise manager
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
    browser.wait(
      ExpectedConditions.elementToBeClickable(findEls('photo-item-link').first()),
    );
  }

  public photoItemLinks(): ElementArrayFinder {
    return findEls('photo-item-link');
  }

  public photoListImages(): ElementArrayFinder {
    return findEls('image');
  }

  public fullPhoto(): ElementFinder {
    return findEl('full-photo');
  }

  public fullPhotoTitle(): ElementFinder {
    return findEl('full-photo-title');
  }

  public fullPhotoImage(): ElementFinder {
    return findEl('full-image');
  }

  public fullPhotoTags(): ElementFinder {
    return findEl('tags');
  }
}
