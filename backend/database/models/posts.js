module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define(
        'posts',
        {
            text_content: DataTypes.STRING,
            author: DataTypes.INTEGER,
            parent: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {}
    )
    posts.associate = function (models) {
        // associations can be defined here
        posts.belongsToMany(models.users, {
            through: 'likedPost',
            as: 'likedUsers',
            foreignKey: 'postId',
        })
        posts.belongsToMany(models.users, {
            through: 'sharedPost',
            as: 'sharedUsers',
            foreignKey: 'postId',
        })
    }
    return posts
}
