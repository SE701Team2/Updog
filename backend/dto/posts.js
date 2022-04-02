import models from '../database/models'
import UserDTO from './users'

export default class PostDTO {
  static async convertToDto(post, userId = 0) {
    const author = await UserDTO.convertToDto(
      await models.users.findByPk(post.author)
    )
    const children = await models.posts.findAll({
      attributes: ['id'],
      where: { parent: post.id },
    })
    const usersLiked = await models.likedPost.findAll({
      where: { postId: post.id },
      raw: true,
    })
    const usersShared = await models.sharedPost.findAll({
      where: { postId: post.id },
      raw: true,
    })
    console.log(usersLiked, userId)
    return {
      id: post.id,
      content: post.text_content,
      author,
      parent: post.parent,
      children: children.map((child) => child.id),
      usersLiked: usersLiked.length,
      usersShared: usersShared.length,
      timestamp: Date.parse(post.updatedAt),
      attachment: null, // work in progress.
      hasLiked: usersLiked.some((like) => like.userId === userId),
      hasShared: usersShared.some((share) => share.userId === userId),
    }
  }
}
