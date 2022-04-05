import { Op } from 'sequelize'
import PostDTO from '../dto/posts'
import models from '../database/models'

// enum of Activity types
export class ActivityType {
  static POSTED = new ActivityType('POSTED')
  static LIKED = new ActivityType('LIKED')
  static SHARED = new ActivityType('SHARED')
  static COMMENTED = new ActivityType('COMMENTED')
  static INTERESTED = new ActivityType('INTERESTED')

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
        parent: {
          [Op.eq]: null,
        },
        author: userId,
      },
      raw: true,
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
      raw: true,
    })

    const sharedActivities = await Promise.all(
      sharedPosts.map(async (sharedPost) => {
        console.log(sharedPost)
        const sharedPostData = await models.posts.findOne({
          where: {
            id: sharedPost.postId,
          },
          raw: true,
        })
        console.log(sharedPostData)
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
      raw: true,
    })

    const likedActivities = await Promise.all(
      likedPosts.map(async (likedPost) => {
        const likedPostData = await models.posts.findOne({
          where: {
            id: likedPost.postId,
          },
          raw: true,
        })
        return new Activity(
          await PostDTO.convertToDto(likedPostData, currentUserId),
          userId,
          ActivityType.LIKED.type,
          Date.parse(likedPost.createdAt)
        )
      })
    )

    const commentPost = await models.posts.findAll({
      where: {
        parent: {
          [Op.ne]: null,
        },
        author: userId,
      },
      raw: true,
    })

    const commentActivities = await Promise.all(
      commentPost.map(
        async (post) =>
          new Activity(
            await PostDTO.convertToDto(post),
            userId,
            ActivityType.COMMENTED.type,
            Date.parse(post.createdAt)
          )
      )
    )

    return [
      ...postActivities,
      ...sharedActivities,
      ...likedActivities,
      ...commentActivities,
    ]
  }

  static async retrieveInterests(userId) {
    const unconvertedInterests = await this.getPostsForInterests(userId)
    const interests = await Promise.all(
      unconvertedInterests.map(
        async (activity) =>
          await this.convertToFeedActivity(
            ActivityType.INTERESTED,
            activity.id,
            activity.author,
            activity.createdAt
          )
      )
    )

    interests.sort((a, b) => b.timestamp - a.timestamp)

    return interests
  }

  // Create a list of activities in order of post creation time
  // from a list of follower objects
  static async retrieveActivityFeed(following) {
    const userActivities = await Promise.all(
      following.map((followee) =>
        Activity.getUserActivities(followee.followedId)
      )
    )
    const feeds = userActivities.reduce(
      (feed, activities) => [...feed, ...activities],
      []
    )
    return feeds.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
  }

  static async convertToFeedActivity(activity, postId, authorId, postTime) {
    const post = await models.posts.findByPk(postId)
    const postDto = await PostDTO.convertToDto(post)
    return {
      post: postDto,
      timestamp: Date.parse(postTime),
      activity: activity.type,
      userId: authorId,
    }
  }

  static async getPostsForInterests(userId) {
    // Retrieve user's interests
    const interestsDB = await models.userInterests.findAll({
      where: {
        userID: userId,
      },
    })

    const postsInterest = await Promise.all(
      interestsDB.map(
        async (interest) =>
          await models.postTag.findAll({
            where: {
              tagID: interest.tagId,
            },
          })
      )
    )
    const relatedPosts = postsInterest.reduce(
      (posts, interests) => [...posts, ...interests],
      []
    )

    // Retrieve the actual posts for the given post IDs
    const posts = await Promise.all(
      relatedPosts.map(async (post) => await models.posts.findByPk(post.postId))
    )

    return posts
  }
}
