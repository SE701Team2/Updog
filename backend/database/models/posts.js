'use strict';
module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define(
        'posts',
        {
            content: {
                type: DataTypes.STRING,
                allowNull: false
            },
            author: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                },
                allowNull: false
            },
            parent: DataTypes.INTEGER,
            attachments: DataTypes.STRING,
        },
    );
    posts.associate = function(models) {
        // associations can be defined here
        posts.belongsTo(models.users,
            {
                foreignKey: 'author',
                targetKey: 'id'
            });
    };
    return posts;
};
