describe('Search Page test', () => {
  beforeEach(() => {
    const username = 'searchpage'
    const email = 'searchpage@test.com'
    const password = '123456789'
    cy.login(username, email, password)
  })

  it('can display posts that are added correctly', () => {
    cy.visit('/')
    cy.getByDataTestId('AddIcon').click()
    cy.getById('post-input-editable').type(
      'Add a unique post for search page to test'
    )
    cy.getByDataTestId('submit-post-button').click()
    cy.visit('/search')
    cy.contains('Add a unique post for search page to test').should(
      'be.visible'
    )
    cy.contains('Latest').click()
    cy.contains('Add a unique post for search page to test').should(
      'be.visible'
    )
    cy.contains('People').click()
    cy.contains('Add a unique post for search page to test').should('not.exist')
  })

  it('can search for post', () => {
    cy.visit('/')
    cy.getByDataTestId('AddIcon').click()
    cy.getById('post-input-editable').type(
      'Add a unique post that can be searched by search page'
    )
    cy.getByDataTestId('submit-post-button').click()

    cy.visit('/')
    cy.getByDataTestId('AddIcon').click()
    cy.getById('post-input-editable').type(
      'Add a more unique post that can also be searched'
    )
    cy.getByDataTestId('submit-post-button').click()

    cy.visit('/search')
    cy.getByDataTestId('search-bar-input').type(
      'unique post that can be searched{enter}'
    )
    cy.contains('Add a unique post that can be searched by search page').should(
      'be.visible'
    )
    cy.contains('Add a more unique post that can also be searched').should(
      'not.exist'
    )

    cy.visit('/search')
    cy.getByDataTestId('search-bar-input').type(
      'unique post that can also be searched{enter}'
    )
    cy.contains('Add a unique post that can be searched by search page').should(
      'not.exist'
    )
    cy.contains('Add a more unique post that can also be searched').should(
      'be.visible'
    )
  })

  it('can see yourself in people list', () => {
    cy.visit('/search')
    cy.contains('People').click()
    cy.contains('@searchpage').should('be.visible')
  })
})
