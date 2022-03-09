module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define(
        'posts',
        {
            text_content: DataTypes.STRING,
            author: DataTypes.INTEGER,
            parent: DataTypes.INTEGER,
            usersLiked: DataTypes.INTEGER,
            usersShared: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
            attachments: DataTypes.STRING,
        },
        {}
    )
    posts.associate = function (models) {
        // associations can be defined here
    }
    return posts
}
