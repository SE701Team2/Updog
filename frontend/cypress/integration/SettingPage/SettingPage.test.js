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

  it('change bio', () => {
    cy.visit('/')
    cy.visit('/settings')

    cy.contains(/^Edit$/).click()
    cy.get('#filled-multiline-static').type('hi')

    cy.contains('Save').click()
    cy.visit('/settingpage')
    cy.contains('hi')
  })

  it('change default banner', () => {
    cy.visit('/settings')
    cy.contains('Change Banner Image').click()
    cy.get('img').eq(2).click()
    cy.contains('Save').click()

    cy.visit('/settings')
    cy.contains('Change Banner Image').click()
    cy.get('img').eq(1).click()
    cy.contains('Save').click()

    cy.visit('/user/settingpage')
    cy.contains('Activity')
    cy.get('img').should(
      'have.attr',
      'src',
      'https://i.ibb.co/L0cf3y7/Himalayan-chocolate-point.jpg'
    )
  })
})
