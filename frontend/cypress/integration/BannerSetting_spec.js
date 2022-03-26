describe('Banner setting test', () => {
  beforeEach(() => {
    cy.request({
      url: 'http://localhost:8000/api/users/authenticate',
      method: 'POST',
      body: { email: 'kirstygong23@gmail.com', password: '123456789' },
      header: null,
    })
      .its('body')
      .then((res) => {
        localStorage.setItem('token', res.authToken)
        localStorage.setItem('username', res.username)
      })
  })

  it('render open banner setting', () => {
    Cypress.Commands.add('clickButton', (id) => {
      cy.get('button').contains(id).click()
    })
    cy.visit('/settings')
    cy.get('#ChangeBanner').click()

    cy.get('#dialog').should('exist')
    cy.get('#closeButton').click()
  })

  it('render close banner setting', () => {
    Cypress.Commands.add('clickButton', (id) => {
      cy.get('button').contains(id).click()
    })
    cy.visit('/settings')
    cy.get('#ChangeBanner').click()

    cy.get('#dialog').should('exist')
    cy.get('#closeButton').click()
    cy.get('#dialog').should('not.exist')
  })

  it('render save banner setting', () => {
    cy.visit('/settings')
    cy.get('#ChangeBanner').click()

    cy.get('#dialog').should('exist')
    cy.get('#saveButton').click()
    cy.get('#dialog').should('not.exist')
  })
})
