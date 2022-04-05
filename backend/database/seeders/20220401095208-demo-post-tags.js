'use strict'

/**
 *  Handles the seeding of default postTags into the database
 */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('postTags', [
      {
        postId: 1,
        tagId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 2,
        tagId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 3,
        tagId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 4,
        tagId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 5,
        tagId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 6,
        tagId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 7,
        tagId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 8,
        tagId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 9,
        tagId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 10,
        tagId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 11,
        tagId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 12,
        tagId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 13,
        tagId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 14,
        tagId: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 15,
        tagId: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 16,
        tagId: 16,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 17,
        tagId: 17,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 18,
        tagId: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 19,
        tagId: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 20,
        tagId: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkInsert('postTags', null, {})
  },
}
