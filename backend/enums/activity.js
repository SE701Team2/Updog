import PostDTO from '../dto/posts'
import models from '../database/models'

// enum of Activity types
export class ActivityType {
  static POSTED = new ActivityType('POSTED')
  static LIKED = new ActivityType('LIKED')
  static SHARED = new ActivityType('SHARED')

  constructor(type) {
    this.type = type
  }
}

export default class Activity {
  constructor(postDto, interactingUser, activityType, activityTime) {
    // Fields named for compatability with old usage
    this.postID = postDto.id
    this.post = postDto
    this.userId = interactingUser
    this.activity = activityType
    this.timestamp = activityTime
  }

  static async getUserActivities(userId, currentUserId) {
    const ownPosts = await models.posts.findAll({
      where: {
        author: userId,
      },
    })

    const postActivities = await Promise.all(
      ownPosts.map(
        async (post) =>
          new Activity(
            await PostDTO.convertToDto(post),
            userId,
            ActivityType.POSTED.type,
            Date.parse(post.createdAt)
          )
      )
    )

    const sharedPosts = await models.sharedPost.findAll({
      where: {
        userID: userId,
      },
    })

    const sharedActivities = await Promise.all(
      sharedPosts.map(async (sharedPost) => {
        const sharedPostData = await models.posts.findOne({
          where: {
            id: sharedPost.postId,
          },
        })
        return new Activity(
          await PostDTO.convertToDto(sharedPostData, currentUserId),
          userId,
          ActivityType.SHARED.type,
          Date.parse(sharedPost.createdAt)
        )
      })
    )

    const likedPosts = await models.likedPost.findAll({
      where: {
        userID: userId,
      },
    })

    const likedActivities = await Promise.all(
      likedPosts.map(async (likedPost) => {
        const likedPostData = await models.posts.findOne({
          where: {
            id: likedPost.postId,
          },
        })
        return new Activity(
          await PostDTO.convertToDto(likedPostData, currentUserId),
          userId,
          ActivityType.LIKED.type,
          Date.parse(likedPost.createdAt)
        )
      })
    )

    return [...postActivities, ...sharedActivities, ...likedActivities]
  }
}
