const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        'users',
        {
            username: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: {
                        msg: 'The email address you entered is invalid',
                    },
                },
            },
            password: DataTypes.STRING,
        },
        {
            hooks: {
                beforeCreate: (User) => {
                    const salt = bcrypt.genSaltSync()
                    User.password = bcrypt.hashSync(User.password, salt)
                    User.password_confirmation = User.password
                },
            },
        }
    )
    users.associate = function (models) {
        // associations can be defined here
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
