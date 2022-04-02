// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Login used to login the user using username, email, password
Cypress.Commands.add('login', (username, email, password) => {
  const setToken = ({ body }) => {
    localStorage.setItem('token', body.authToken)
    localStorage.setItem('username', body.username)
  }
  // Login to fake user
  cy.request({
    url: 'http://localhost:8000/api/users/authenticate',
    method: 'POST',
    body: { email, password },
    failOnStatusCode: false,
  }).then((result) => {
    if (result.status !== 401) {
      return setToken(result)
    }
    // User doesn't exist create one
    cy.request({
      url: 'http://localhost:8000/api/users',
      method: 'POST',
      body: {
        nickname: username,
        username,
        email,
        password,
      },
    }).then(setToken)
  })
})

Cypress.Commands.add('getById', (selector, ...args) => {
  return cy.get(`[id=${selector}]`, ...args)
})

Cypress.Commands.add('getByDataTest', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('getByDataTestId', (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args)
})
