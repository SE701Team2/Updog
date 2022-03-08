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
                type: Sequelize.STRING,
            },
            parent: {
                type: Sequelize.INTEGER,
            },
            usersLiked: {
                type: Sequelize.INTEGER,
            },
            usersShared: {
                type: Sequelize.INTEGER,
            },
            timestamp: {
                type: Sequelize.DATE,
            },
            attachments: {
                type: Sequelize.STRING,
            },
        }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('posts'),
}
