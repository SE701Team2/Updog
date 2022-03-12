module.exports = (sequelize, DataTypes) => {
    const followers = sequelize.define(
        'followers',
        {
            followedId: DataTypes.INTEGER,
            followerId: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {}
    )
    followers.associate = function (models) {
        // associations can be defined here
    }
    return followers
}
