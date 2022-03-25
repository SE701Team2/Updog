import models from '../database/models'
import Helper from './helper/helper'

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
})
