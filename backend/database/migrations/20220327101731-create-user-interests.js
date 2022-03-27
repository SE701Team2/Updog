'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userInterests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: 'userInterest',
      },
      tagId: {
        type: Sequelize.INTEGER,
        unique: 'userInterest',
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
    await queryInterface.dropTable('userInterests')
  },
}
