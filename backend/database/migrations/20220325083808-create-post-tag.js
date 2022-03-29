'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('postTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'postTag',
      },
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'postTag',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('postTags')
  },
}
