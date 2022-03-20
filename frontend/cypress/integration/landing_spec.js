describe('Frontpage test', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Check landing page welcome text', () => {
    cy.contains("Check out what's going on in the world right now.") // Apostrophe needs to be added once PR #134 is closed
  })
})
