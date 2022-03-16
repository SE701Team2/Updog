const sampleFeed = [
    {
        id: 1,
        content: 'Post 1',
        author: {
            id: 1,
            username: 'poster1',
            nickname: 'Poster 1',
            profilePic: 'https://i.imgur.com/qZImY9j.jpg',
        },
        parent: null,
        children: [5],
        usersLiked: 1,
        usersShared: 2,
        timestamp: 1646627469012,
    },
    {
        id: 2,
        content: 'Post 2',
        author: {
            id: 2,
            username: 'poster2',
            nickname: 'Poster 2',
            profilePic: 'https://i.imgur.com/PiJAoqO.jpeg',
        },
        parent: null,
        children: [],
        usersLiked: 50,
        usersShared: 33,
        timestamp: 1646627527764,
    },
    {
        id: 3,
        content: 'Post 3',
        author: {
            id: 1,
            username: 'poster1',
            nickname: 'Poster 1',
            profilePic: 'https://i.imgur.com/qZImY9j.jpg',
        },
        parent: null,
        children: [],
        usersLiked: 10,
        usersShared: 20,
        timestamp: 1646627527764,
    },
]

export default sampleFeed
