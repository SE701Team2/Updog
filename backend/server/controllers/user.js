import models from '../../database/models'
import { Authentication } from '../../middlewares/authentication'
import { UserDTO } from '../../dto/users'

export const addUser = async (req, res) => {
    try {
        const { body } = req
        console.log('🚀 ~ file: user.js ~ line 6 ~ addUser ~ body', body)

        const createUser = await models.users.create({
            username: body.username,
            email: body.email,
            password: body.password,
        })

        res.status(201).send(createUser)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getUsersById = async (req, res) => {
    try {
        const { params } = req
        const user = await models.users.findByPk(params.id)
        const authToken = req.get('Authorization')

        if (!authToken) {
            res.status(400).send({
                'Error message': 'Auth token not provided',
            })
        }

        const decodedUser = Authentication.extractUser(authToken)

        if (!decodedUser.id) {
            res.status(401).send({
                'Error message': 'Auth token invalid',
            })
        } else {
            // sending user response in specific format
            const userDTO = new UserDTO(
                user.id,
                user.username,
                user.nickname,
                user.profilePic,
                user.profileBanner,
                user.bio,
                user.followers,
                user.following,
                user.joinedDate
            )
            res.status(200).send(userDTO.getUserObject())
        }
    } catch (error) {
        res.status(500).send({ 'Error message': error.toString() })
    }
}

export const authenticateUser = async (req, res) => {
    try {
        const { body } = req
        const user = await models.users.findOne({
            where: {
                email: body.email,
            },
        })

        if (!user || !user.validatePassword(body.password)) {
            res.status(401).send({
                error: 'Incorrect email or password',
            })
        } else {
            const authToken = Authentication.generateAuthToken(user)
            res.status(200).send({
                message: 'Authentication successful',
                authToken: authToken,
            })
        }
    } catch (error) {
        res.status(500).send({ 'Error message': error.toString() })
    }
}
