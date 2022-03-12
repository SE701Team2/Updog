import models from '../database/models'

/* eslint-disable import/prefer-default-export */
export class UserDTO {
    static async convertToDto(user) {
        const numFollowers = await models.followers.count({
            where: { followedId: user.id },
        })

        const numFollowing = await models.followers.count({
            where: { followerId: user.id },
        })

        return {
            id: user.id,
            username: user.username,
            nickname: user.nickname,
            profilePic: user.profilePic,
            profileBanner: user.profileBanner,
            bio: user.bio,
            followers: numFollowers,
            following: numFollowing,
            joinedDate: user.joinedDate,
        }
    }
}
