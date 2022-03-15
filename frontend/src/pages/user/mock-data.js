// mock-data.js
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

export const sampleFeed = [
    {
        id: 1,
        content: 'Post 1',
        author: sampleUser,
        parent: null,
        children: [5],
        usersLiked: 1,
        usersShared: 2,
        timestamp: 1646627469012,
    },
    {
        id: 2,
        content: 'Post 2',
        author: sampleUser,
        parent: null,
        children: [],
        usersLiked: 50,
        usersShared: 33,
        timestamp: 1646627527764,
    },
    {
        id: 3,
        content: 'Post 3',
        author: sampleUser,
        parent: null,
        children: [],
        usersLiked: 10,
        usersShared: 20,
        timestamp: 1646627527764,
    },
]
