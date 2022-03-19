describe('Frontpage test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Check landing page welcome text', () => {
    cy.contains("Check out what's going on in the world right now.") // Apostrophe needs to be added once PR #134 is closed
  })
})
