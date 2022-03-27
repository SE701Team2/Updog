'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  tags.init(
    {
      tagName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'tags',
    }
  )
  tags.getTagByName = async (tagname) => {
    const tag = await tags.findOne({
      raw: true,
      where: {
        tagName: tagname,
      },
    })

    return tag
  }
  return tags
}
