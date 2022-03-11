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
                type: Sequelize.ARRAY(Sequelize.INTEGER),
            },
            following: {
                allowNull: false,
                type: Sequelize.ARRAY(Sequelize.INTEGER),
            },
            posts: {
                allowNull: false,
                type: Sequelize.ARRAY(Sequelize.INTEGER),
            },
            likes: {
                allowNull: false,
                type: Sequelize.ARRAY(Sequelize.INTEGER),
            },
            shares: {
                allowNull: false,
                type: Sequelize.ARRAY(Sequelize.INTEGER),
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
