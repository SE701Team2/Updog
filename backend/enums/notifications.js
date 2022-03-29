import models from '../database/models'

export default class Notifications {
  static reply = new Notifications('reply')

  static like = new Notifications('like')

  static share = new Notifications('share')

  static follow = new Notifications('follow')

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

    const user = await models.users.findOne({
      where: {
        id: userId,
      },
    })
    const follows = await this.retrieveAllFollows(user)

    const notifications = [...replies, ...likes, ...shares, ...follows]
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
    if (notificationType === Notifications.follow) {
      const user = await models.users.findOne({
        where: {
          id: details.followerId,
        },
      })

      return {
        type: notificationType.type,
        from: user.username,
        post: null,
        timestamp: Date.parse(details.createdAt),
        content: user.id,
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

    await Promise.all(
      userPosts.map(async (post) => {
        const replies = await post.getUnreadReplies(post.id)

        await Promise.all(
          replies.map(async (r) =>
            allReplies.push(
              await this.convertToNotifications(Notifications.reply, r)
            )
          )
        )
      })
    )

    return allReplies
  }

  static async retrieveAllLikes(userPosts) {
    const allLikes = []

    await Promise.all(
      userPosts.map(async (post) => {
        const likes = await models.likedPost.findAll({
          where: {
            postId: post.id,
            read: false,
          },
        })

        await Promise.all(
          likes.map(async (l) =>
            allLikes.push(
              await this.convertToNotifications(Notifications.like, l)
            )
          )
        )
      })
    )

    return allLikes
  }

  static async retrieveAllShares(userPosts) {
    const allShares = []

    await Promise.all(
      userPosts.map(async (post) => {
        const shares = await models.sharedPost.findAll({
          where: {
            postId: post.id,
            read: false,
          },
        })

        await Promise.all(
          shares.map(async (s) =>
            allShares.push(
              await this.convertToNotifications(Notifications.share, s)
            )
          )
        )
      })
    )

    return allShares
  }

  static async retrieveAllFollows(user) {
    const allFollows = []

    const followers = await models.followers.findAll({
      where: {
        followedId: user.id,
        read: false,
      },
    })

    await Promise.all(
      followers.map(async (follower) =>
        allFollows.push(
          await this.convertToNotifications(Notifications.follow, follower)
        )
      )
    )

    return allFollows
  }
}
