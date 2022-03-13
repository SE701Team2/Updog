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
    down: (queryInterface, Sequelize) =>
        queryInterface.dropTable('attachments'),
}
