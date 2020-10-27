import * as fs from 'fs';
import {
  browser,
  by,
  element,
  ElementArrayFinder,
  ElementFinder,
  Locator,
} from 'protractor';

export function queryAttributeLocator(testId: string): Locator {
  return by.css(`[data-testid="${testId}"]`);
}

export function findEl(testId: string): ElementFinder {
  return element(queryAttributeLocator(testId));
}

export function findEls(testId: string): ElementArrayFinder {
  return element.all(queryAttributeLocator(testId));
}

export async function takeScreenshot(title: string): Promise<void> {
  const pngData = await browser.takeScreenshot();
  const stream = fs.createWriteStream(`./e2e/screenshots/${title}.png`);
  stream.write(Buffer.from(pngData, 'base64'));
  stream.end();
}
