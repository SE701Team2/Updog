'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    { hooks: {
            beforeCreate: (User) => {
                const salt = bcrypt.genSaltSync();
                User.password = bcrypt.hashSync(User.password, salt);
                User.password_confirmation = User.password;
            }
        },
    }
  );
  users.associate = function(models) {
    // associations can be defined here
  };
  users.prototype.validatePassword = function (plainText) {
    return bcrypt.compareSync(plainText, this.password);
  }
  return users;
};
