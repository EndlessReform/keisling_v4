/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://keisling.me',
  generateRobotsTxt: true, // (optional)
  // ...other options
}