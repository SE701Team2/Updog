/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import models from '../database/models'

export class Notifications {
  static reply = new Notifications('reply')

  static like = new Notifications('like')

  static share = new Notifications('share')

  constructor(type) {
    this.type = type
  }

  static async retrieveNotifications(userId) {
    const userPosts = await models.posts.findAll({
      where: {
        author: userId,
      },
    })

    const replies = await this.retrieveAllReplies(userPosts)
    const likes = await this.retrieveAllLikes(userPosts)
    const shares = await this.retrieveAllShares(userPosts)

    const notifications = [...replies, ...likes, ...shares]
    notifications.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
    return notifications
  }

  static async convertToNotifications(notificationType, details) {
    if (notificationType === Notifications.reply) {
      const user = await models.users.findOne({
        where: {
          id: details.author,
        },
      })

      return {
        type: notificationType.type,
        from: user.username,
        post: details.id,
        timestamp: Date.parse(details.createdAt),
        content: details.text_content,
      }
    }
    const user = await models.users.findOne({
      where: {
        id: details.userId,
      },
    })

    return {
      type: notificationType.type,
      from: user.username,
      post: details.postId,
      timestamp: Date.parse(details.createdAt),
      content: null,
    }
  }

  static async retrieveAllReplies(userPosts) {
    const allReplies = []
    for (const post of userPosts) {
      const replies = await post.getReplies(post.id)
      replies.map((r) =>
        allReplies.push(this.convertToNotifications(Notifications.reply, r))
      )
    }

    return allReplies
  }

  static async retrieveAllLikes(userPosts) {
    const allLikes = []
    for (const post of userPosts) {
      const likes = await models.likedPost.findAll({
        where: {
          postId: post.id,
        },
      })

      likes.map((l) =>
        allLikes.push(this.convertToNotifications(Notifications.like, l))
      )
    }

    return allLikes
  }

  static async retrieveAllShares(userPosts) {
    const allShares = []
    for (const post of userPosts) {
      const shares = await models.sharedPost.findAll({
        where: {
          postId: post.id,
        },
      })

      shares.map((s) =>
        allShares.push(this.convertToNotifications(Notifications.share, s))
      )
    }

    return allShares
  }
}
