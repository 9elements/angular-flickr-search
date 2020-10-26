import {
  browser,
  ElementArrayFinder,
  ElementFinder,
  ExpectedConditions,
} from 'protractor';

import { findEl, findEls } from '../e2e.spec-helper';

/**
 * Page object for the Flickr Search using async/await
 */
export class FlickrSearch {
  public async navigateTo(): Promise<any> {
    return await browser.get('/');
  }

  public async searchFor(term: string): Promise<void> {
    const input = findEls('searchTermInput').first();
    await input.clear();
    await input.sendKeys(term);
    await findEls('submitSearch').first().click();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(findEls('photo-item-link').first()),
    );
  }

  public photoItemLinks(): ElementArrayFinder {
    return findEls('photo-item-link');
  }

  public photoItemImages(): ElementArrayFinder {
    return findEls('photo-item-image');
  }

  public fullPhoto(): ElementFinder {
    return findEl('full-photo');
  }

  public fullPhotoTitle(): ElementFinder {
    return findEl('full-photo-title');
  }

  public fullPhotoImage(): ElementFinder {
    return findEl('full-photo-image');
  }

  public fullPhotoTags(): ElementFinder {
    return findEl('tags');
  }
}
