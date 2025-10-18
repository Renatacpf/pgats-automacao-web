const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    pageLoadTimeout: 120000, // 2 minutes for page load
    defaultCommandTimeout: 15000, // 15 seconds for commands
    requestTimeout: 15000, // 15 seconds for network requests
    responseTimeout: 15000, // 15 seconds for responses
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
  },
});
