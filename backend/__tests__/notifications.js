import models from '../database/models'
import Notifications from '../enums/notifications'

describe('Notifications', () => {
  describe('retrieveAllReplies', () => {
    it('should return it in the correct format', async () => {
      // GIVEN two users
      const password = 'PASSWORD'
      const randomUsername1 = (Math.random() + 1).toString(36).substring(7)
      const email1 = `test@${randomUsername1}.com`

      const user1 = await models.users.create({
        username: randomUsername1,
        nickname: randomUsername1,
        email: email1,
        password,
      })

      const randomUsername2 = (Math.random() + 1).toString(36).substring(7)
      const email2 = `test@${randomUsername2}.com`

      const user2 = await models.users.create({
        username: randomUsername2,
        nickname: randomUsername2,
        email: email2,
        password,
      })

      // WHEN one user replies to the other's post
      const parent = await models.posts.create({
        text_content: 'This is a post',
        author: user1.id,
        parent: null,
      })

      const reply = await models.posts.create({
        text_content: 'This is my first reply',
        author: user2.id,
        parent: parent.id,
        createdAt: '2021-03-13 04:56:53',
      })

      // THEN it should be added to the other user's notifications
      const expectedOutput = [
        {
          type: 'reply',
          timestamp: Date.parse(reply.createdAt),
          from: user2.username,
          post: reply.id,
          content: reply.text_content,
        },
      ]

      const notifications = await Notifications.retrieveAllReplies([parent])
      expect(notifications).toEqual(expectedOutput)
    })
  })

  describe('retrieveAllLikes', () => {
    it('should return it in the correct format', async () => {
      // GIVEN two users
      const password = 'PASSWORD'
      const randomUsername1 = (Math.random() + 1).toString(36).substring(7)
      const email1 = `test@${randomUsername1}.com`

      const user1 = await models.users.create({
        username: randomUsername1,
        nickname: randomUsername1,
        email: email1,
        password,
      })

      const randomUsername2 = (Math.random() + 1).toString(36).substring(7)
      const email2 = `test@${randomUsername2}.com`

      const user2 = await models.users.create({
        username: randomUsername2,
        nickname: randomUsername2,
        email: email2,
        password,
      })

      // WHEN one user likes the other user's post
      const parent = await models.posts.create({
        text_content: 'This is a post',
        author: user1.id,
        parent: null,
      })

      const like = await models.likedPost.create({
        userId: user2.id,
        postId: parent.id,
        createdAt: '2021-03-12 04:56:53',
      })

      // THEN the other user should be notified
      const expectedOutput = [
        {
          type: 'like',
          timestamp: Date.parse(like.createdAt),
          from: user2.username,
          post: like.postId,
          content: null,
        },
      ]

      const notifications = await Notifications.retrieveAllLikes([parent])
      expect(notifications).toEqual(expectedOutput)
    })
  })

  describe('retrieveAllShares', () => {
    it('should return it in the correct format', async () => {
      // GIVEN two users
      const password = 'PASSWORD'
      const randomUsername1 = (Math.random() + 1).toString(36).substring(7)
      const email1 = `test@${randomUsername1}.com`

      const user1 = await models.users.create({
        username: randomUsername1,
        nickname: randomUsername1,
        email: email1,
        password,
      })

      const randomUsername2 = (Math.random() + 1).toString(36).substring(7)
      const email2 = `test@${randomUsername2}.com`

      const user2 = await models.users.create({
        username: randomUsername2,
        nickname: randomUsername2,
        email: email2,
        password,
      })

      // WHEN one user shares the other user's post
      const parent = await models.posts.create({
        text_content: 'This is a post',
        author: user1.id,
        parent: null,
      })

      const share = await models.sharedPost.create({
        userId: user2.id,
        postId: parent.id,
        createdAt: '2022-03-13 04:56:53',
      })

      // THEN the other user should be notified
      const expectedOutput = [
        {
          type: 'share',
          timestamp: Date.parse(share.createdAt),
          from: user2.username,
          post: share.postId,
          content: null,
        },
      ]

      const notifications = await Notifications.retrieveAllShares([parent])
      expect(notifications).toEqual(expectedOutput)
    })
  })

  describe('retrieveAllFollows', () => {
    it('should return it in the correct format', async () => {
      // GIVEN two users
      const password = 'PASSWORD'
      const randomUsername1 = (Math.random() + 1).toString(36).substring(7)
      const email1 = `test@${randomUsername1}.com`

      const user1 = await models.users.create({
        username: randomUsername1,
        nickname: randomUsername1,
        email: email1,
        password,
      })

      const randomUsername2 = (Math.random() + 1).toString(36).substring(7)
      const email2 = `test@${randomUsername2}.com`

      const user2 = await models.users.create({
        username: randomUsername2,
        nickname: randomUsername2,
        email: email2,
        password,
      })

      // WHEN one user follows another user
      const follow = await models.followers.create({
        followedId: user2.id,
        followerId: user1.id,
        createdAt: '2022-03-28 04:56:53',
      })

      // THEN the other user should be notified
      const expectedOutput = [
        {
          type: 'follow',
          from: user1.username,
          post: null,
          timestamp: Date.parse(follow.createdAt),
          content: user1.id,
        },
      ]

      const notifications = await Notifications.retrieveAllFollows(user2)
      expect(notifications).toEqual(expectedOutput)
    })
  })

  describe('retrieveNotifications', () => {
    it('should return it in the correct order and format', async () => {
      // GIVEN two users
      const password = 'PASSWORD'
      const randomUsername1 = (Math.random() + 1).toString(36).substring(7)
      const email1 = `test@${randomUsername1}.com`

      const user1 = await models.users.create({
        username: randomUsername1,
        nickname: randomUsername1,
        email: email1,
        password,
      })

      const randomUsername2 = (Math.random() + 1).toString(36).substring(7)
      const email2 = `test@${randomUsername2}.com`

      const user2 = await models.users.create({
        username: randomUsername2,
        nickname: randomUsername2,
        email: email2,
        password,
      })

      // WHEN one user replies to the other's post
      const parent = await models.posts.create({
        text_content: 'This is a post',
        author: user2.id,
        parent: null,
      })

      // "Reply" notification comes before "Follow"
      const reply = await models.posts.create({
        text_content: 'This is a reply',
        author: user1.id,
        parent: parent.id,
        createdAt: '2021-03-13 04:56:53',
      })

      // WHEN one user follows another user
      const follow = await models.followers.create({
        followedId: user2.id,
        followerId: user1.id,
        createdAt: '2022-03-28 04:56:53',
      })

      // THEN the other user should be notified
      const expectedOutput = [
        {
          type: 'follow',
          from: user1.username,
          post: null,
          timestamp: Date.parse(follow.createdAt),
          content: user1.id,
        },
        {
          type: 'reply',
          timestamp: Date.parse(reply.createdAt),
          from: user1.username,
          post: reply.id,
          content: reply.text_content,
        },
      ]

      const notifications = await Notifications.retrieveNotifications(user2.id)
      expect(notifications).toEqual(expectedOutput)
    })
  })

  describe('retrieveUnreadNotifications', () => {
    it('should return it in the correct order and format', async () => {
      // GIVEN two users
      const password = 'PASSWORD'
      const randomUsername1 = (Math.random() + 1).toString(36).substring(7)
      const email1 = `test@${randomUsername1}.com`

      const user1 = await models.users.create({
        username: randomUsername1,
        nickname: randomUsername1,
        email: email1,
        password,
      })

      const randomUsername2 = (Math.random() + 1).toString(36).substring(7)
      const email2 = `test@${randomUsername2}.com`

      const user2 = await models.users.create({
        username: randomUsername2,
        nickname: randomUsername2,
        email: email2,
        password,
      })

      // WHEN one user replies to the other's post
      const parent = await models.posts.create({
        text_content: 'This is a post',
        author: user2.id,
        parent: null,
      })

      const reply = await models.posts.create({
        text_content: 'This is a reply',
        author: user1.id,
        parent: parent.id,
        createdAt: '2022-03-13 04:56:53',
      })

      const share = await models.sharedPost.create({
        userId: user1.id,
        postId: parent.id,
        createdAt: '2022-03-11 04:56:53',
      })

      // Will not notify if marked as read by recipient
      await models.followers.create({
        followedId: user2.id,
        followerId: user1.id,
        createdAt: '2022-03-28 04:56:53',
        read: true,
      })

      // THEN the other user should be notified
      const expectedOutput = [
        {
          type: 'reply',
          timestamp: Date.parse(reply.createdAt),
          from: user1.username,
          post: reply.id,
          content: reply.text_content,
        },
        {
          type: 'share',
          timestamp: Date.parse(share.createdAt),
          from: user1.username,
          post: share.postId,
          content: null,
        },
      ]

      const notifications = await Notifications.retrieveNotifications(user2.id)
      expect(notifications).toEqual(expectedOutput)
    })
  })
})
