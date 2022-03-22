import models from '../database/models'
import Authentication from '../middlewares/authentication'

const assert = require('assert')

describe('Authentication', () => {
  describe('Generating token', () => {
    it('Test that the string returned is the correct format', () => {
      const user = {
        username: 'test-username',
        nickname: 'gandalf',
        password: 'Password',
        email: 'test@email.com',
      }

      const authToken = Authentication.generateAuthToken(user)

      const tokenArray = authToken.split('.')

      assert.strictEqual(tokenArray.length, 3)
    })
  })

  describe('Extracting user', () => {
    it('Test extracting user from jwt', async () => {
      await models.users.create({
        username: 'test-username',
        nickname: 'gandalf',
        password: 'Password',
        email: 'test@email.com',
      })

      const user = await models.users.findOne({
        where: {
          username: 'test-username',
        },
      })

      const authToken = Authentication.generateAuthToken(user)

      const decodedUser = Authentication.extractUser(`Bearer ${authToken}`)
      assert.strictEqual(decodedUser.username, 'test-username')
      assert.strictEqual(decodedUser.email, 'test@email.com')
    })
  })
})
