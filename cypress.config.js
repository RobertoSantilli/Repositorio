const { defineConfig } = require("cypress");
const { Client } = require('pg');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async connectDB(query) {
          const client = new Client({
            user: "",
            password: "",
            host: "",
            database: "",
            ssl: true,
            port: 1234,
          })
          await client.connect();
          const res = await client.query(query);
          await client.end();
          return res.rows
        }
      })
      // implement node event listeners here
    },
    experimentalMemoryManagement: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    watchForFileChanges: false,
    baseUrl: 'https://pushing-it.vercel.app/',
    fixturesFolder: 'cypress/fixtures',
    defaultCommandTimeout: 10000,
    requestTimeout: 60000,
    responseTimeout: 60000,
    pageLoadTimeout: 60000,
    env: {
      user: 'pushingit',
      password: '123456!',
      token: null,
      userId: null,
      base_url_api: 'https://pushing-it-3.onrender.com/api'
    }
  },

});
