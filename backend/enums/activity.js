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

  static async retrieveActivities(following) {
    const postsActivity = []
    const likedPostsActivity = []
    const sharedPostsActivity = []

    await Promise.all(
      following.map(async (user) => {
        const unconvertedActivity = await this.getUnconvertedActivity(
          user.followedId
        )

        await Promise.all(
          unconvertedActivity[0].map(async (activity) => {
            const act = await this.convertToFeedActivity(
              this.POSTED,
              activity.id,
              activity.author,
              activity.createdAt
            )
            postsActivity.push(act)
          })
        )

        await Promise.all(
          unconvertedActivity[1].map(async (activity) => {
            const act = await this.convertToFeedActivity(
              this.LIKED,
              activity.postId,
              activity.userId,
              activity.createdAt
            )
            likedPostsActivity.push(act)
          })
        )

        await Promise.all(
          unconvertedActivity[2].map(async (activity) => {
            const act = await this.convertToFeedActivity(
              this.SHARED,
              activity.postId,
              activity.userId,
              activity.createdAt
            )
            sharedPostsActivity.push(act)
          })
        )
      })
    )

    const activity = [
      ...postsActivity,
      ...likedPostsActivity,
      ...sharedPostsActivity,
    ]
    activity.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))

    return activity
  }

  static async retrieveInterests(userId) {
    const interests = []
    const unconvertedInterests = await this.getPostsForInterests(userId)
    await Promise.all(
      unconvertedInterests.map(async (activity) => {
        const post = await this.convertToFeedActivity(
          this.SHARED,
          activity.postId,
          activity.userId,
          activity.createdAt
        )
        interests.push(post)
      })
    )

    interests.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))

    return interests
  }

  static convertToUserActivity(activity, postId, postTime) {
    return {
      postID: postId,
      timestamp: Date.parse(postTime),
      activity: activity.type,
    }
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

  static async getUserActivities(userId) {
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
          await PostDTO.convertToDto(sharedPostData),
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
          await PostDTO.convertToDto(likedPostData),
          userId,
          ActivityType.LIKED.type,
          Date.parse(likedPost.createdAt)
        )
      })
    )

    return [...postActivities, ...sharedActivities, ...likedActivities]
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

  static async getPostsForInterests(userId) {
    const posts = []
    // Retrieve user's interests
    const interestsDB = await models.userInterests.findAll({
      where: {
        userID: userId,
      },
    })

    const relatedPosts = []

    // Retrieve post IDs relevant to the user's interests
    for (let interest of interestsDB) {
      relatedPosts.push(
        ...(await models.posttag.findAll({
          where: {
            tagID: interest.tagId,
          },
        }))
      )
    }

    // Retrieve the actual posts for the given post IDs
    for (let postId of relatedPosts) {
      posts.push(await models.posts.findByPk(postId))
    }

    return posts
  }
}
