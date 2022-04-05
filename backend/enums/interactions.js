import models from '../database/models'
import UserDTO from '../dto/users'

/**
 * Supports operations for recieving users who interacted with a post
 */
export default class Interactions {
  /**
   *  Retrieves a list of users who liked a given post
   */
  static async getUsersThatLiked(postId) {
    const likes = await models.likedPost.findAll({
      where: {
        postId,
      },
    })

    const users = Promise.all(
      likes.map(async (l) => {
        const user = await models.users.findOne({
          where: { id: l.userId },
        })
        const userDTO = await UserDTO.convertToDto(user)
        return userDTO
      })
    )

    return users
  }

  /**
   * Retrieves a list of users who shared a given post
   */
  static async getUsersThatShared(postId) {
    const shares = await models.sharedPost.findAll({
      where: {
        postId,
      },
    })
    const users = Promise.all(
      shares.map(async (s) => {
        const user = await models.users.findOne({
          where: { id: s.userId },
        })
        const userDTO = await UserDTO.convertToDto(user)
        return userDTO
      })
    )

    return users
  }
}
