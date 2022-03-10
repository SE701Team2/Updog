'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
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
            nickname: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            followers: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            following: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            posts: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            likes: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            shares: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            joinedDate: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users')
    },
}
