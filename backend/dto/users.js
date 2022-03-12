/* eslint-disable import/prefer-default-export */
export class UserDTO {
    static convertToDto(user, followers, following) {
        let numFollowers = 0
        let numFollowing = 0
        if (followers && followers instanceof Array) {
            numFollowers = followers.length
        }
        if (following && following instanceof Array) {
            numFollowing = following.length
        }
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
