const sampleUserReplier = {
    id: 1,
    username: 'replier',
    nickname: 'Replier',
    profilePic: 'https://i.imgur.com/PiJAoqO.jpeg',
}

const sampleReply = {
    id: 2,
    content: 'reply content',
    author: sampleUserReplier,
    parent: null,
    children: [],
    usersLiked: 2,
    usersShared: 3,
    timestamp: 1646627527764,
    attachments: null,
}

export default sampleReply
