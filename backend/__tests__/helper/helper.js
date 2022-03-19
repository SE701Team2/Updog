import models from '../../database/models'

const assert = require('assert')

describe('This file needs at least one test', () => {
  it('Nothing', () => {
    assert.notEqual(2 + 2, 5)
  })
})

/** Contains functions called in tests */
export default class Helper {
  static async createUser(
    username,
    password,
    email,
    bio,
    profileBanner,
    profilePic
  ) {
    const randomUsername = (Math.random() + 1).toString(36).substring(7)
    const user = await models.users.create({
      username: username || randomUsername,
      nickname: username || randomUsername,
      email: email || 'TEST@GMAIL.COM',
      password: password || 'PASSWORD',
      bio: bio || null,
      profileBanner: profileBanner || null,
      profilePic: profilePic || null,
    })
    return user
  }

  static async createFollowers(followedId, followerId) {
    const follower = await models.followers.create({
      followedId,
      followerId,
    })
    return follower
  }

  static async createPost(text, authorId, parentId, createdAt) {
    // parentId is for a reply
    const newPost = await models.posts.create({
      text_content: text || 'Test text',
      author: authorId,
      parent: parentId,
      createdAt,
    })
    return newPost
  }

  static async likePost(postId, userId, createdAt) {
    const likedPost = await models.likedPost.create({
      postId,
      userId,
      createdAt,
    })
    return likedPost
  }

  static async sharePost(postId, userId, createdAt) {
    const sharedPost = await models.sharedPost.create({
      postId,
      userId,
      createdAt,
    })
    return sharedPost
  }
}
