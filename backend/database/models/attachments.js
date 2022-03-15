module.exports = (sequelize, DataTypes) => {
    const attachments = sequelize.define(
        'attachments',
        {
            postID: DataTypes.INTEGER,
            attachmentLink: DataTypes.STRING,
        },
        {
            timestamps: false,
        }
    )
    attachments.associate = function (models) {
        // associations can be defined heresss
    }
    return attachments
}
