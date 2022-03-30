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

  // Create a list of activities by a user in chronological order
  static async getUserActivities(userId) {
    let activities = []
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
          ActivityType.POSTED.type,
          Date.parse(post.createdAt)
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
          ActivityType.SHARED.type,
          Date.parse(sharedPost.createdAt)
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
          ActivityType.LIKED.type,
          Date.parse(likedPost.createdAt)
        )
      )
    }

    activities.sort((a, b) => {
      return a.timestamp < b.timestamp ? 1 : -1
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
      return a.timestamp < b.timestamp ? 1 : -1
    })
    return feed
  }
}
