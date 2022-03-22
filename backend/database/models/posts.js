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
      through: 'likedPosts',
      as: 'likedUsers',
      foreignKey: 'postId',
    })
    posts.belongsToMany(models.users, {
      through: 'sharedPosts',
      as: 'sharedUsers',
      foreignKey: 'postId',
    })
  }

  posts.prototype.getReplies = async (id) => {
    const replies = await posts.findAll({
      where: {
        parent: id,
      },
    })

    return replies
  }

  return posts
}
