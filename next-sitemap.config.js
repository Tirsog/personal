/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || "https://tirsog.es",
    generateRobotsTxt: true, // (optional)
    // ...other options
}
