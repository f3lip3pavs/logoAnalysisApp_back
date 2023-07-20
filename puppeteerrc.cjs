const {join} = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */

module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, 'node_modules/chromium/lib/chromium/chrome-win', 'puppeteer'),
};
