import { defineConfig } from 'cypress'
import cypressLocalStorageCommands from 'cypress-localstorage-commands/plugin'

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      cypressLocalStorageCommands(on, config)
      return config
    },
    specPattern: 'tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/cypress/support/e2e.{js,jsx,ts,tsx}',
    screenshotsFolder: 'tests/cypress/screenshots',
    downloadsFolder: 'tests/cypress/downloads',
  },
})
