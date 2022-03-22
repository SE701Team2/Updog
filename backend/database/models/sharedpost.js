const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class sharedPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  sharedPost.init(
    {
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'sharedPost',
    }
  )
  return sharedPost
}
