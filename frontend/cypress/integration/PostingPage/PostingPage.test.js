describe('Posting Page test', () => {
  beforeEach(() => {
    const username = 'postpage'
    const email = 'postpage@test.com'
    const password = '12345678'
    cy.login(username, email, password)
  })

  Cypress.on('uncaught:exception', (err, runnable, promise) => {
    if (promise) {
      return false
    }
  })

  it('can post a normal new post', () => {
    cy.visit('/')
    cy.getByDataTestId('AddIcon').click()
    cy.getById('post-input-editable').type('Add a normal text new post')
    cy.getByDataTestId('submit-post-button').click()
    cy.contains('Add a normal text new post').should('be.visible')
  })
  it('can limit the word count in 250 characters', () => {
    cy.visit('/')
    cy.getByDataTestId('AddIcon').click()
    cy.getById('post-input-editable').type(
      'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'
    )
    cy.getByDataTestId('submit-post-button').click()
    cy.contains(
      'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnop'
    ).should('be.visible')
  })
  it('cannot post an empty post', () => {
    cy.visit('/')
    cy.getByDataTestId('AddIcon').click()
    cy.getByDataTestId('submit-post-button').click()
    //Wait for more testing on notifications if in future this action is prohibited along with a specific indication to users
    cy.getByDataTestId('submit-post-button').should('be.visible')
  })
  it('can detect a mention(@) action in the text field', () => {
    cy.visit('/')
    cy.getByDataTestId('AddIcon').click()
    cy.getById('post-input-editable').type('@searchpage')
    cy.getByDataTestId('submit-post-button').click()
    cy.contains('@searchpage').should('have.usedHandles', ['searchpage'])
  })
})
