'use strict'

const usersId = [1, 2, 3, 4]
const maxPostId = 41

module.exports = {
  async up(queryInterface) {
    let shares = []
    for (let i = 1; i <= maxPostId; i++) {
      shares = [
        ...shares,
        ...usersId
          .map((userId) =>
            Math.random() > 0.9
              ? {
                  userId,
                  postId: i,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                }
              : null
          )
          .filter((share) => !!share),
      ]
    }
    return queryInterface.bulkInsert('sharedPosts', shares)
  },

  async down(queryInterface) {
    return queryInterface.bulkInsert('sharedPosts', null, {})
  },
}
