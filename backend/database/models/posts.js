module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define(
        'posts',
        {
            text_content: DataTypes.STRING,
            author: DataTypes.INTEGER,
            parent: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
            attachments: DataTypes.STRING,
        },
        {}
    )
    posts.associate = function (models) {
        // associations can be defined here
        posts.belongsToMany(models.users, {
            through: 'likedPost',
            as: 'users',
            foreignKey: 'postId',
        })
        posts.belongsToMany(models.users, {
            through: 'sharedPost',
            as: 'users',
            foreignKey: 'postId',
        })
    }
    return posts
}
