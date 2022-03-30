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
    this.postId = postDto.id
    this.post = postDto
    this.userId = interactingUser
    this.activity = activityType
    this.timestamp = activityTime
  }

  // Create a list of activities by a user in order of post creation time
  // TODO: Use time at which post was liked or shared by the user rather
  // than post creation time
  static async getUserActivities(userId) {
    const activities = []
    let ownPosts = await models.posts.findAll({
      where: {
        author: userId,
      },
    })
    // async forEach didn't seem to await properly
    for (const post of ownPosts) {
      activities.push(
        new Activity(
          await PostDTO.convertToDto(post),
          userId,
          ActivityType.POSTED,
          post.dataValues.createdAt
        )
      )
    }

    let sharedPosts = await models.sharedPost.findAll({
      where: {
        userID: userId,
      },
    })
    for (const sharedPost of sharedPosts) {
      // Get each real post DTO by querying individually
      let post = await models.posts.findOne({
        where: {
          id: sharedPost.postId,
        },
      })
      activities.push(
        new Activity(
          await PostDTO.convertToDto(post),
          userId,
          ActivityType.SHARED,
          post.dataValues.createdAt
        )
      )
    }

    let likedPosts = await models.likedPost.findAll({
      where: {
        userID: userId,
      },
    })
    for (const likedPost of likedPosts) {
      let post = await models.posts.findOne({
        where: {
          id: likedPost.postId,
        },
      })
      activities.push(
        new Activity(
          await PostDTO.convertToDto(post),
          userId,
          ActivityType.LIKED,
          post.dataValues.createdAt
        )
      )
    }

    activities.sort((a, b) => {
      a.activityTime > b.activityTime ? 1 : -1
    })

    return activities
  }

  // Create a list of activities in order of post creation time
  // from a list of follower objects
  static async retrieveActivityFeed(following) {
    const feed = []
    for (const id of following.map((f) => f.dataValues.followedId)) {
      let activities = await Activity.getUserActivities(id)
      feed.push(...activities)
    }
    feed.sort((a, b) => {
      a.activityTime > b.activityTime ? 1 : -1
    })
    return feed
  }
}
