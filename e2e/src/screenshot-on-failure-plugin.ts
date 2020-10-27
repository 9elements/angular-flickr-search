// tslint:disable: max-line-length
import * as fs from 'fs';
import { browser } from 'protractor';

const DIR = './e2e/screenshots/';

// Adapted from
// https://github.com/testing-angular-applications/testing-angular-applications/blob/master/chapter10/test_screenshot/screenshot_on_failure_plugin.ts
// MIT-licensed by Craig Nishina
export async function postTest(passed: boolean, testInfo: any): Promise<void> {
  if (!passed) {
    const category = testInfo.category.replace(/[\s\/]/g, '_');
    const name = testInfo.name.replace(/[\s\/]/g, '_');
    const path = `${DIR}failure_${category}_${name}.png`;
    const data = await browser.takeScreenshot();
    if (!fs.existsSync(DIR)) {
      fs.mkdirSync(DIR);
    }
    fs.writeFileSync(path, data, 'base64');
    console.log(`Saved screenshot: ${path}`);
  }
}
