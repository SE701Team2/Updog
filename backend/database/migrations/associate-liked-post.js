'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.createTable('likedPost', {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            postId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
        })
    },

    async down(queryInterface, Sequelize) {
        queryInterface.dropTable('likedPost')
    },
}
