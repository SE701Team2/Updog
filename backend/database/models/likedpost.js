const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class likedPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  likedPost.init(
    {
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      read: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'likedPost',
    }
  )
  return likedPost
}
