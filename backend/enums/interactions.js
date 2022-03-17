/* eslint-disable import/prefer-default-export */
import models from '../database/models'
import { UserDTO } from '../dto/users'

export class Interactions {
    static async getUsersThatLiked(postId) {
        const likes = await models.likedPost.findAll({
            where: {
                postId,
            },
        })

        const users = await Promise.all(
            likes.map(async (l) => {
                const user = await models.users.findOne({
                    where: { id: l.userId },
                })
                return UserDTO.convertToDto(user)
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
        const users = await Promise.all(
            shares.map(async (s) => {
                const user = await models.users.findOne({
                    where: { id: s.userId },
                })
                return UserDTO.convertToDto(user)
            })
        )

        return users
    }
}
