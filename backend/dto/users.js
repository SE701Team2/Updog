import models from '../database/models'

/**
 * A data-transfer-object representing the information of a User
 */
export default class UserDTO {
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
      profilePic: user.profilePic ? user.profilePic : null,
      profileBanner: user.profileBanner ? user.profileBanner : null,
      bio: user.bio ? user.bio : null,
      followers: numFollowers,
      following: numFollowing,
      joinedDate: user.joinedDate,
    }
  }
}
