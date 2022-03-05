'use strict';
module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define(
        'posts',
        {
            testContent: DataTypes.STRING
        },
        {}
    );
    posts.associate = function(models) {
        // associations can be defined here
    };
    return posts;
};
