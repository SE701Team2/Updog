module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('followers', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      followedId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      followerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    })
  },

  async down(queryInterface) {
    queryInterface.dropTable('followers')
  },
}
