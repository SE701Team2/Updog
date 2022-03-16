import models from '../database/models'

export class Notifications {
    static reply = new Notifications('reply');
    static like = new Notifications('like');
    static share = new Notifications('share');

    constructor(type) {
        this.type = type;
    }

    static async retrieveNotifications(userId) {
        const userPosts = await models.posts.findAll({
            where: {
                author: userId
            }
        })

        const replies = await this.retrieveAllReplies(userPosts)
        const likes = await this.retrieveAllLikes(userPosts)
        const shares = await this.retrieveAllShares(userPosts)

        let notifications = [...replies, ...likes, ...shares]
        notifications.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
        return notifications
    }

    static convertToNotifications(notificationType, details){
        if(notificationType === Notifications.reply){
            return {
                type: notificationType.type,
                from: details.author,
                post: details.id,
                timestamp: Date.parse(details.createdAt),
                content: details.text_content
            }
        }

        return {
            type: notificationType.type,
            from: details.userId,
            post: details.postId,
            timestamp: Date.parse(details.createdAt),
            content: null
        }
    }

    static async retrieveAllReplies(userPosts) {
        let allReplies = [];
        for(const post of userPosts){
            let replies = await post.getReplies(post.id)
            replies.map(r => allReplies.push(this.convertToNotifications(Notifications.reply, r)))
        }

        return allReplies
    }

    static async retrieveAllLikes(userPosts) {
        let allLikes = [];
        for(const post of userPosts){
            const likes = await models.likedPost.findAll({
                where: {
                    postId: post.id
                }
            })

            likes.map(l => allLikes.push(this.convertToNotifications(Notifications.like, l)))
        }

        return allLikes
    }

    static async retrieveAllShares(userPosts) {
        let allShares = [];
        for(const post of userPosts){
            const shares = await models.sharedPost.findAll({
                where: {
                    postId: post.id
                }
            })

            shares.map(s => allShares.push(this.convertToNotifications(Notifications.share, s)))
        }

        return allShares
    }
}