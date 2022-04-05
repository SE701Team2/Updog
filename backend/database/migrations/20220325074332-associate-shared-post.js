/**
 * Handles the creation/deletion of the sharedPosts table in the database
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('sharedPosts', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      read: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    })
  },

  async down(queryInterface) {
    queryInterface.dropTable('sharedPosts')
  },
}
