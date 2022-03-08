const sampleUserReplier = {
  id: 1,
  username: "replier",
  nickname: "Replier",
  profilePic: "https://i.imgur.com/PiJAoqO.jpeg",
};

const sampleUserPoster = {
  id: 2,
  username: "poster",
  nickname: "Poster",
  profilePic: "https://i.imgur.com/qZImY9j.jpg",
};

export const sampleReply = {
  id: 2,
  content: "reply content",
  author: sampleUserReplier,
  parent: null,
  children: [],
  usersLiked: 2,
  usersShared: 3,
  timestamp: 1646627527764,
  attachments: null,
};

export const samplePost = {
  id: 1,
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ",
  author: sampleUserPoster,
  parent: null,
  children: [2],
  usersLiked: 1,
  usersShared: 2,
  timestamp: 1646627469012,
  attachments: null,
};
