describe('ChooseInterestsPageController', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('button').contains('Create an Account').click()

    const time = Date.now()
    cy.get('input').eq(0).type(`${time}`)
    cy.get('input').eq(1).type(`${time}@testing.com`)
    cy.get('input').eq(2).type('password')
    cy.get('button').contains('Continue').click()
  })

  it('shows the choose interests page after signing up', () => {
    cy.url().should('eq', 'http://localhost:3000/signUp')
    cy.get('h5').contains('What are you interested in?').should('be.visible')
  })

  it('should redirect to dashboard once the continue to dashboard button is clicked', () => {
    cy.get('#continue-to-dashboard').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})
