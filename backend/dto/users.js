/* eslint-disable import/prefer-default-export */
export class UserDTO {
    id

    username

    nickname

    profilePic

    profileBanner

    bio

    followers

    following

    joinedDate

    constructor(
        id,
        username,
        nickname,
        profilePic,
        profileBanner,
        bio,
        followers,
        following,
        joinedDate
    ) {
        this.id = id
        this.username = username
        this.nickname = nickname
        this.profilePic = profilePic
        this.profileBanner = profileBanner
        this.bio = bio
        this.followers = followers
        this.following = following
        this.joinedDate = joinedDate
    }

    getUserObject() {
        return {
            id: this.id,
            username: this.username,
            nickname: this.nickname,
            profilePic: this.profilePic,
            profileBanner: this.profileBanner,
            bio: this.bio,
            followers: this.followers.length,
            following: this.following.length,
            joinedDate: this.joinedDate,
        }
    }

    getId() {
        return this.id
    }

    getUsername() {
        return this.username
    }

    getNickName() {
        return this.nickname
    }

    getProfilePic() {
        return this.profilePic
    }

    getProfileBanner() {
        return this.profileBanner
    }

    getBio() {
        return this.bio
    }

    getFollowers() {
        return this.followers
    }

    getFollowing() {
        return this.following
    }

    getJoinedDate() {
        return this.joinedDate
    }
}
