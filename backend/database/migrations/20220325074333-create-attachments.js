/**
 * Handles the creation/deletion of the attachments table in the database
 */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('attachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postID: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      attachmentLink: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('attachments'),
}
