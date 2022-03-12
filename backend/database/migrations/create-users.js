module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            nickname: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            profilePic: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            profileBanner: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            bio: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            followers: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            following: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            posts: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            likes: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            shares: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            joinedDate: {
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
        }),
    down: (queryInterface) => queryInterface.dropTable('users'),
}
