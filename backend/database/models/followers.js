const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class followers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  followers.init(
    {
      followedId: DataTypes.INTEGER,
      followerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'followers',
    }
  )
  return followers
}
