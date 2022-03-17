/* eslint-disable import/prefer-default-export */
import models from '../database/models'
import { UserDTO } from '../dto/users'

export class Interactions {
    static async getUsersThatLiked(postId) {
        const users = []
        const likes = await models.likedPost.findAll({
            where: {
                postId,
            },
        })
        likes.map(async (l) => {
            const user = await models.users.findOne({
                where: { id: l.userId },
            })
            users.push(UserDTO.convertToDto(user))
        })
    }

    static async getUsersThatShared(postId) {
        const users = []
        const shares = await models.sharedPost.findAll({
            where: {
                postId,
            },
        })
        shares.map(async (s) => {
            const user = await models.users.findOne({
                where: { id: s.userId },
            })
            users.push(UserDTO.convertToDto(user))
        })
    }
}
