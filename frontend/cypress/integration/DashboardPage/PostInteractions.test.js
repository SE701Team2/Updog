describe('Post interaction test', () => {
  beforeEach(() => {
    const username = 'postinteractions'
    const email = 'postinteractions@test.com'
    const password = '123456789'
    cy.login(username, email, password)
  })

  it('render open banner setting', () => {
    cy.visit('/')
    cy.get('#ChangeBanner').click()

    cy.get('#dialog').should('exist')
    cy.get('#closeButton').click()
  })
})
