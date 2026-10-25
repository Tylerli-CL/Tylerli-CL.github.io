const path = require("path");

module.exports = {
  testDir: __dirname,
  testMatch: "personal-site.spec.js",
  timeout: 60000,
  expect: { timeout: 10000 },
  use: {
    baseURL: "http://127.0.0.1:4000",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: process.env.NO_WEBSERVER
    ? undefined
    : {
        command: "npm run build:site && npm run preview",
        cwd: path.resolve(__dirname, "../.."),
        url: "http://127.0.0.1:4000/",
        reuseExistingServer: !process.env.CI,
        timeout: 300000,
      },
  projects: [
    { name: "desktop-light", use: { viewport: { width: 1366, height: 1000 }, colorScheme: "light" } },
    { name: "desktop-dark", use: { viewport: { width: 1366, height: 1000 }, colorScheme: "dark" } },
    { name: "mobile-light", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, colorScheme: "light" } },
    { name: "mobile-dark", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, colorScheme: "dark" } },
  ],
};
