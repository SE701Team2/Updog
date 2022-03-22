import Activity from '../enums/activity'
import models from '../database/models'
import PostDTO from '../dto/posts'

describe('Activity', () => {
  describe('convertToUserActivity', () => {
    it('should return it in the correct format', async () => {
      const postId = 1
      const updatedAt = '2021-03-13 04:56:53'

      const expectedOutput = {
        postID: postId,
        timestamp: Date.parse(updatedAt),
        activity: 'LIKED',
      }

      const actual = Activity.convertToUserActivity(
        Activity.LIKED,
        postId,
        updatedAt
      )
      expect(actual).toEqual(expectedOutput)
    })
  })
  describe('convertToFeedActivity', () => {
    it('should return it in the correct format', async () => {
      const password = 'PASSWORD'
      const randomUsername1 = (Math.random() + 1).toString(36).substring(7)
      const email1 = `test@${randomUsername1}.com`

      const user1 = await models.users.create({
        username: randomUsername1,
        nickname: randomUsername1,
        email: email1,
        password,
      })

      const newPost = await models.posts.create({
        text_content: 'Updog is the next big thing',
        author: user1.id,
        parent: null,
        createdAt: '2020-03-13 04:56:53',
      })

      const dto = await PostDTO.convertToDto(newPost)
      const expectedOutput = {
        post: dto,
        timestamp: Date.parse(newPost.createdAt),
        activity: 'LIKED',
        userId: user1.id,
      }

      const actual = await Activity.convertToFeedActivity(
        Activity.LIKED,
        newPost.id,
        user1.id,
        newPost.createdAt
      )
      expect(actual).toEqual(expectedOutput)
    })
  })
})
