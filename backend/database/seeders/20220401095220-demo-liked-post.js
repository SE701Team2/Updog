/* eslint-disable indent */
'use strict'

const usersId = [1, 2, 3, 4]
const maxPostId = 41

/**
 *  Handles the seeding of default likes into the database
 */
module.exports = {
  async up(queryInterface) {
    let likes = []
    for (let i = 1; i <= maxPostId; i++) {
      likes = [
        ...likes,
        ...usersId
          .map((userId) =>
            Math.random() > 0.7
              ? {
                  userId,
                  postId: i,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                }
              : null
          )
          .filter((like) => !!like),
      ]
    }
    return queryInterface.bulkInsert('likedPosts', likes)
  },

  async down(queryInterface) {
    return queryInterface.bulkInsert('likedPosts', null, {})
  },
}
