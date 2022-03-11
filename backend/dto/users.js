/* eslint-disable import/prefer-default-export */
export class UserDTO {
    static convertToDto(user) {
        return {
            id: user.id,
            username: user.username,
            nickname: user.nickname,
            profilePic: user.profilePic,
            profileBanner: user.profileBanner,
            bio: user.bio,
            followers: user.followers.length,
            following: user.following.length,
            joinedDate: user.joinedDate,
        }
    }
}
