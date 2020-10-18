import {
  browser,
  ElementArrayFinder,
  ElementFinder,
  ExpectedConditions,
  promise,
} from 'protractor';

import { findEl, findEls } from './e2e.spec-helper';

export class FlickrSearch {
  public navigateTo(): promise.Promise<any> {
    return browser.get('/');
  }

  public searchFor(term: string): void {
    const input = findEls('searchTermInput').first();
    input.clear();
    input.sendKeys(term);
    findEls('submitSearch').first().click();
    browser.wait(ExpectedConditions.elementToBeClickable(findEl('photo-item-link')));
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
