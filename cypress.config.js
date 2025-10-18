const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    pageLoadTimeout: 200000, // 3+ minutes for page load
    defaultCommandTimeout: 20000, // 20 seconds for commands
    requestTimeout: 20000, // 20 seconds for network requests
    responseTimeout: 20000, // 20 seconds for responses
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
  },
});
