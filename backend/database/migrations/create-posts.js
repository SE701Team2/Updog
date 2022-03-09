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
            usersLiked: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            usersShared: {
                allowNull: false,
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
            attachments: {
                type: Sequelize.STRING,
            },
        }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('posts'),
}
