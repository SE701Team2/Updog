import models from '../database/models'
import UserDTO from '../dto/users'

export default class Interactions {
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
