'use strict'
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
            followers: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
            },
            following: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
            },
            posts: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
            },
            likes: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
            },
            shares: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
            },
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
    }
    users.prototype.validatePassword = function (plainText) {
        return bcrypt.compareSync(plainText, this.password)
    }
    return users
}
