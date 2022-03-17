/* eslint-disable import/prefer-default-export */
import { convertToPostDto } from '../dto/posts'
import models from '../database/models'

export class Activity {
    static POSTED = new Activity('POSTED')

    static LIKED = new Activity('LIKED')

    static SHARED = new Activity('SHARED')

    constructor(type) {
        this.type = type
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
        const postDto = await convertToPostDto(post)
        return {
            post: postDto,
            timestamp: Date.parse(postTime),
            activity: activity.type,
            userId: authorId,
        }
    }

    static async getUnconvertedActivity(userId) {
        // Retrieve user's posts, including the shared and liked posts
        const postsDB = await models.posts.findAll({
            where: {
                author: userId,
            },
        })

        const sharedPosts = await models.sharedPost.findAll({
            where: {
                userID: userId,
            },
        })

        const likedPosts = await models.likedPost.findAll({
            where: {
                userID: userId,
            },
        })

        // Merge the posts together into one array
        return [postsDB, likedPosts, sharedPosts]
    }
}
