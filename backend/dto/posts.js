import models from '../database/models'

/* eslint-disable import/prefer-default-export */
export const convertToPostDto = async (post) => {
    const author = await models.users.findByPk(post.author)
    const children = await models.posts.findAll({
        attributes: ['id'],
        where: { parent: post.id },
    })
    const usersLiked = await models.likedPost.count({
        where: { postId: post.id },
    })
    const usersShared = await models.sharedPost.count({
        where: { postId: post.id },
    })

    return {
        id: post.id,
        content: post.text_content,
        author,
        parent: post.parent,
        children: children.map((child) => child.id),
        usersLiked,
        usersShared,
        timestamp: Date.parse(post.updatedAt),
        attachment: null, // work in progress.
    }
}
