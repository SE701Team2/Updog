import request from 'supertest'
import server from '../server/index'
import models from '../database/models'
import Authentication from '../middlewares/authentication'
import Helper from './helper/helper'
import TagDTO from '../dto/tags'

const assert = require('assert')

describe('Tags', () => {
  beforeEach(async () => {
    await models.tags.destroy({
      where: {},
    })
    await models.postTag.destroy({
      where: {},
    })
  })

  describe('when a tag is created', () => {
    it('it should be able to be found', async () => {
      const tag = await Helper.createTag('Science')

      const dbTag = await models.tags.findOne({
        raw: true,
        where: {
          tagName: 'Science',
        },
      })
      console.log(dbTag)
      assert.equal(dbTag.id, tag.id)
    })
  })

  describe('when a post tag is created', () => {
    it('it should be able to be found', async () => {
      const postId = 1
      const tagId = 2

      await Helper.createPostTag(postId, tagId)

      const dbTag = await models.postTag.findOne({
        where: {
          postId: 1,
        },
      })

      assert.equal(dbTag.postId, postId)
      assert.equal(dbTag.tagId, tagId)
    })
  })

  describe('When a user requests to create a new tag', () => {
    it('should return with a 200 Created code', async () => {
      const user1 = await Helper.createUser()

      const authToken = Authentication.generateAuthToken(user1)

      const createTagResponse = await request(server)
        .post('/api/tags')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          tagName: 'Dogs',
        })
      expect(createTagResponse.statusCode).toBe(200)
      expect(createTagResponse.body.tagName).toBe('Dogs')
    })
  })

  describe('When a user requests to create an existing tag', () => {
    it('should return with a 200 Ok code', async () => {
      const user1 = await Helper.createUser()

      const authToken = Authentication.generateAuthToken(user1)

      const dogTag = await models.tags.create({
        tagName: 'Dogs',
      })

      const createTagResponse = await request(server)
        .post('/api/tags')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          tagName: 'Dogs',
        })
      expect(createTagResponse.statusCode).toBe(200)
      expect(createTagResponse.body.id).toBe(dogTag.id)
      expect(createTagResponse.body.tagName).toBe(dogTag.tagName)
    })
  })

  describe('When the frontend requests the list of tags', () => {
    it('Should return an empty array', async () => {
      const user1 = await Helper.createUser()
      const authToken = Authentication.generateAuthToken(user1)

      const createTagResponse = await request(server)
        .get('/api/tags')
        .set('Authorization', `Bearer ${authToken}`)

      expect(createTagResponse.statusCode).toBe(200)
      expect(createTagResponse.body).toStrictEqual([])
    })
  })

  describe('When the frontend requests the list of tags', () => {
    it('Should return a list of tags', async () => {
      const user1 = await Helper.createUser()
      const authToken = Authentication.generateAuthToken(user1)

      const tagList = ['dog', 'cat', 'science']
      const tags = await Promise.all(
        tagList.map((tagName) => Helper.createTag(tagName))
      )

      const tagsDTO = await Promise.all(
        tags.map((tag) => TagDTO.convertToDTO(tag))
      )

      const createTagResponse = await request(server)
        .get('/api/tags')
        .set('Authorization', `Bearer ${authToken}`)

      expect(createTagResponse.statusCode).toBe(200)
      expect(createTagResponse.body[0]).toStrictEqual(tagsDTO[0])
      expect(createTagResponse.body[1]).toStrictEqual(tagsDTO[1])
      expect(createTagResponse.body[2]).toStrictEqual(tagsDTO[2])
    })
  })
})
