import { PostPageView } from "./PostPageView"

const sampleUserReplier = {
    id: 1,
    username: "replier",
    nickname: "Replier",
    profilePic: "https://i.imgur.com/PiJAoqO.jpeg",
}

const sampleUserPoster = {
    id: 2,
    username: "poster",
    nickname: "Poster",
    profilePic: "https://i.imgur.com/qZImY9j.jpg",
}

const sampleReply1 = {
    id: 2,
    content: "reply content",
    author: sampleUserReplier,
    parent: null,
    children: [],
    usersLiked: 2,
    usersShared: 3,
    timestamp: 1646627527764,
    attachments: null
}

const sampleReply2 = {
    id: 3,
    content: "reply content 2",
    author: sampleUserReplier,
    parent: null,
    children: [],
    usersLiked: 4,
    usersShared: 5,
    timestamp: 1646627527764,
    attachments: null
}

const sampleReply3 = {
    id: 4,
    content: "reply content 3",
    author: sampleUserReplier,
    parent: null,
    children: [],
    usersLiked: 4,
    usersShared: 5,
    timestamp: 1646627527764,
    attachments: null
}

const samplePost = {
    id: 1,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ",
    author: sampleUserPoster,
    parent: null,
    children: [sampleReply1, sampleReply2, sampleReply3],
    usersLiked: 1,
    usersShared: 2,
    timestamp: 1646627469012,
    attachments: null
}

export const PostPageController = () => {
    // when db / store is implemented, use const { id } = useParams() to get the id from url,
    // then use the id to fetch the post data.
    return <PostPageView post={samplePost} />
}