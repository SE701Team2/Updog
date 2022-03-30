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
    cy.visit('/')
    cy.get('#icon')
    cy.visit('/settings')
    // cy.get('#logout').click()
    // cy.visit('/siginin')
    // cy.get('#sigin').should('exist')
  })
})
