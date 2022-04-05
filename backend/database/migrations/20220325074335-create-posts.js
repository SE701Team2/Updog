/**
 * Handles the creation/deletion of the posts table in the database
 */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text_content: {
        type: Sequelize.STRING,
      },
      author: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      parent: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      read: {
        //Read by parent author
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('posts'),
}
