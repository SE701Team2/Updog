import request from 'supertest'
import server from '../server/index'
import models from '../database/models'
import Helper from './helper/helper'
import Authentication from '../middlewares/authentication'

const assert = require('assert')

describe('Interests', () => {
  beforeEach(async () => {
    await models.userInterests.destroy({
      where: {},
    })
    await models.tags.destroy({
      where: {
        tagName: 'testTag',
      },
    })
    await models.users.destroy({
      where: {
        username: 'testUser',
      },
    })
  })

  describe('POST /interests', () => {
    it('Should return a 200 status response and the interests should be added to the database', async () => {
      const user = await Helper.createUser('testUser', 'test')

      const tag = await Helper.createTag('testTag')

      const token = Authentication.generateAuthToken(user)

      const response = await request(server)
        .post('/api/interests')
        .set('Authorization', `Bearer ${token}`)
        .send({
          interests: ['testTag'],
        })

      assert.equal(response.statusCode, 200)

      const dbInterests = await models.userInterests.findAll({
        where: {
          userId: user.id,
        },
      })

      assert.equal(dbInterests.length, 1)
      assert.equal(dbInterests[0].tagId, tag.id)
    })
  })

  describe('GET /interests', () => {
    it('Should return a 200 status response and an array of tags that the user is interested in', async () => {
      const user = await Helper.createUser('testUser', 'test')
      const tag = await Helper.createTag('testTag')
      await Helper.createUserInterest(user.id, tag.id)

      const token = Authentication.generateAuthToken(user)

      const response = await request(server)
        .get('/api/interests')
        .set('Authorization', `Bearer ${token}`)

      assert.equal(response.statusCode, 200)
      assert.equal(response.body.Interests.length, 1)
      assert.equal(response.body.Interests[0], 'testTag')
    })
  })

  describe('DELETE /interests', () => {
    it('Should return a 200 status response and the interests should be removed from the database', async () => {
      const user = await Helper.createUser('testUser', 'test')
      const tag1 = await Helper.createTag('testTag')
      const tag2 = await Helper.createTag('testTag2')
      await Helper.createUserInterest(user.id, tag1.id)
      await Helper.createUserInterest(user.id, tag2.id)

      const token = Authentication.generateAuthToken(user)

      const response = await request(server)
        .delete('/api/interests')
        .set('Authorization', `Bearer ${token}`)
        .send({
          interests: ['testTag'],
        })

      assert.equal(response.statusCode, 200)

      const dbInterests = await models.userInterests.findAll({
        where: {
          userId: user.id,
        },
      })

      assert.equal(dbInterests.length, 1)
      assert.equal(dbInterests[0].tagId, tag2.id)
    })
  })
})
