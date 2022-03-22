const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            msg: 'The email address you entered is invalid',
          },
        },
      },
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
      profilePic: {
        type: DataTypes.STRING,
        validate: {
          isUrl: 'This image needs to be a link',
        },
      },
      profileBanner: {
        type: DataTypes.STRING,
        validate: {
          isUrl: 'This image needs to be a link',
        },
      },
      bio: DataTypes.STRING,
      joinedDate: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      hooks: {
        beforeCreate: (User) => {
          const salt = bcrypt.genSaltSync()
          User.password = bcrypt.hashSync(User.password, salt)
          User.password_confirmation = User.password

          User.joinedDate = Math.floor(Date.now() / 1000)
        },
      },
    }
  )
  users.associate = function (models) {
    // associations can be defined here
    users.belongsToMany(models.users, {
      through: 'followers',
      as: 'follower',
      foreignKey: 'followedId',
    })
    users.belongsToMany(models.users, {
      through: 'followers',
      as: 'followed',
      foreignKey: 'followerId',
    })
    users.belongsToMany(models.posts, {
      through: 'likedPost',
      as: 'likedPosts',
      foreignKey: 'userId',
    })
    users.belongsToMany(models.posts, {
      through: 'sharedPost',
      as: 'sharedPosts',
      foreignKey: 'userId',
    })
  }
  users.prototype.validatePassword = function (plainText) {
    return bcrypt.compareSync(plainText, this.password)
  }
  return users
}
