export const sampleUser = {
    id: 1,
    username: 'username',
    nickname: 'nickname',
    bio: 'a biography',
    profileBanner: 'https://i.imgur.com/PcEvuMw.png',
    profilePic: 'https://i.imgur.com/qZImY9j.jpg',
    followers: 11,
    following: 22,
    joinedDate: 1646627469012,
}

export const sampleNotifications = [
    {
        type: 'reply', // possible = like, share, reply
        from: 2, // user who interacted with the post
        post: 1, // post that was interacted on
        timestamp: 1646627469012, // unix timestamp when the interaction happened
        content: 'cool', // if type reply, this will be the content of the reply, else null
    },
    {
        type: 'share',
        from: 2,
        post: 1,
        timestamp: 1646627527764,
        content: null,
    },
    {
        type: 'like',
        from: 2,
        post: 1,
        timestamp: 1646627527764,
        content: null,
    },
    {
        type: 'like',
        from: 3,
        post: 1,
        timestamp: 1646627527764,
        content: null,
    },
]
