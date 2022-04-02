describe('Post interaction test', () => {
  beforeEach(() => {
    const username = 'postinteractions'
    const email = 'postinteractions@test.com'
    const password = '123456789'
    cy.login(username, email, password)
  })

  it('checks interactions under post', () => {
    cy.visit('/')

    cy.getByDataTestId('AddIcon').click()
    cy.getById('post-input-editable').type(
      'Add a unique post for post interactions'
    )
    cy.getByDataTestId('submit-post-button').click()

    const username = 'postinteractions2'
    const email = 'postinteractions2@test.com'
    const password = '123456789'
    cy.login(username, email, password)
    cy.visit('/user/postinteractions')
    cy.contains('Follow').click()

    cy.visit('/')
    cy.contains('unique post for post interactions').should('be.visible')
    cy.getByDataTestId('like-btn').first().contains('0')
    cy.getByDataTestId('like-btn').first().click()
    cy.getByDataTestId('like-btn').first().contains('1')
    cy.getByDataTestId('like-btn').first().click()
    cy.getByDataTestId('like-btn').first().contains('0')

    cy.getByDataTestId('share-btn').first().contains('0')
    cy.getByDataTestId('share-btn').first().click()
    cy.getByDataTestId('share-btn').first().contains('1')
    cy.getByDataTestId('share-btn').first().click()
    cy.getByDataTestId('share-btn').first().contains('0')
  })

  it('check if like is stored', () => {
    cy.visit('/')

    cy.getByDataTestId('AddIcon').click()
    cy.getById('post-input-editable').type(
      'Add a unique post for testing that state works liked'
    )
    cy.getByDataTestId('submit-post-button').click()

    const username = 'postinteractions3'
    const email = 'postinteractions3@test.com'
    const password = '123456789'
    cy.login(username, email, password)
    cy.visit('/user/postinteractions')
    cy.contains('Follow').click()

    cy.visit('/')
    cy.contains('unique post for testing that state works liked').should(
      'be.visible'
    )
    cy.getByDataTestId('like-btn').first().contains('0')
    cy.getByDataTestId('like-btn').first().click()

    cy.visit('/')
    cy.getByDataTestId('like-btn').first().contains('1')
  })

  it('checks if shared is stored', () => {
    cy.visit('/')

    cy.getByDataTestId('AddIcon').click()
    cy.getById('post-input-editable').type(
      'Add a unique post for testing that state works shared'
    )
    cy.getByDataTestId('submit-post-button').click()

    const username = 'postinteractions4'
    const email = 'postinteractions4@test.com'
    const password = '123456789'
    cy.login(username, email, password)
    cy.visit('/user/postinteractions')
    cy.contains('Follow').click()

    cy.visit('/')
    cy.contains('unique post for testing that state works shared').should(
      'be.visible'
    )
    cy.getByDataTestId('share-btn').first().contains('0')
    cy.getByDataTestId('share-btn').first().click()

    cy.visit('/')
    cy.getByDataTestId('share-btn').first().contains('1')
  })
})
