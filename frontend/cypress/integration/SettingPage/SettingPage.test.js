import createTypography from '@mui/material/styles/createTypography'

describe('Banner setting test', () => {
  beforeEach(() => {
    const username = 'settingpage'
    const email = 'settingpage@test.com'
    const password = '123456789'
    cy.login(username, email, password)
  })

  it('render open banner setting', () => {
    cy.visit('/')
    cy.visit('/settings')

    cy.contains('Log out').click()

    cy.contains('Sign in').click()

    cy.url().should('contain', '/signIn')
  })

  it('render open banner setting', () => {
    cy.visit('/')
    cy.visit('/settings')

    cy.contains('Log out').click()

    cy.contains('Sign in').click()

    cy.url().should('contain', '/signIn')
  })
})
