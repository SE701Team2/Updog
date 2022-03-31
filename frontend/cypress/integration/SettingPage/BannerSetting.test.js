describe('Banner setting test', () => {
  beforeEach(() => {
    const username = 'bannersetting'
    const email = 'bannersetting@test.com'
    const password = '123456789'
    cy.login(username, email, password)
  })

  it('render open banner setting', () => {
    cy.visit('/settings')
    cy.get('#ChangeBanner').click()

    cy.get('#dialog').should('exist')
    cy.get('#closeButton').click()
  })

  it('render close banner setting', () => {
    cy.visit('/settings')
    cy.get('#ChangeBanner').click()

    cy.get('#dialog').should('exist')
    cy.get('#closeButton').click()
    cy.get('#dialog').should('not.exist')
  })
})
