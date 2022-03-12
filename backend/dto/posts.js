import models from '../database/models'

/* eslint-disable import/prefer-default-export */
export const convertToPostDto = async (post) => {
    const author = await models.users.findByPk(post.author)
    const children = await models.posts.findAll({
        attributes: ['id'],
        where: { parent: post.id },
    })

    return {
        id: post.id,
        content: post.text_content,
        author,
        parent: post.parent,
        children: children.map((child) => child.id),
        usersLiked: 0, // work in progress.
        usersShared: 0, // work in progress.
        timestamp: post.updatedAt,
        attachment: null, // work in progress.
    }
}
