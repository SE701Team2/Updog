import models from '../../database/models'
import { Authentication } from '../../middlewares/authentication'
import {decode} from "jsonwebtoken";

/*
Requires authentication.
Response codes:
201 CREATED when the post has successfully been created.
500 INTERNAL SERVER ERROR otherwise.
*/
export const createPost = async (req, res, Sequelize) => {
    try {
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
            const { body } = req
            /*
            NOTE: attachments is current a STRING type as the attachment functionality has not been setup yet.
            */
            const createNewPost = await models.posts.create({
                content: body.content,
                author: decodedUser,
                parent: body.parent,
                usersLiked: 0,
                usersShared: 0,
                attachments: body.attachments
            })
            res.status(201).send(createNewPost)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

/*
Does not require authentication.
Path paramter: id - the id of the post that is being retrieved.
Response Codes:
200 OK when the post has been successfully found.
404 NOT FOUND when the post with that id can not be found.
500 INTERNAL SERVER ERROR for everything else.
*/
export const getPostById = async (req, res) => {
    try {
        const { params } = req
        const post = await models.posts.findByPk(params.id)
        if (post != null) {
            res.status(200).send(post)
        } else {
            res.status(404).send('ID not found.')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

/*
Requires authentication.
Path paramter: id - the id of the post that is being modified.
Response Codes:
200 OK when the post has been successfully modified.
404 NOT FOUND when the post with that id can not be found.
500 INTERNAL SERVER ERROR for everything else.
*/
export const modifyPostById = async (req, res) => {
    try {
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
            const { params, body } = req

            const updated = await models.posts.update(
                {
                    text_content: body.text_content,
                    usersLiked: body.usersLiked,
                    usersShared: body.usersShared,
                },
                { returning: true, where: { id: params.id } }
            )
            if (updated) {
                res.status(200).send('The message has been updated.')
            } else {
                res.status(404).send('Invalid ID.')
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

/*
Requires authentication.
Path parameter: id - the id of the post that is being deleted.
Response Codes:
200 OK when the post has been successfully deleted.
404 NOT FOUND when the post with that id can not be found.
500 INTERNAL SERVER ERROR for everything else.
*/
export const deletePostById = async (req, res) => {
    try {
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
            const { params } = req
            const count = await models.posts.destroy({
                where: { id: params.id },
            })
            if (count !== 0) {
                res.status(200).send('The message has been deleted.')
            } else {
                res.status(404).send('Invalid ID.')
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            text_content: {
                type: Sequelize.STRING,
            },
            author: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            parent: {
                type: Sequelize.INTEGER,
            },
            usersLiked: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            usersShared: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            attachments: {
                type: Sequelize.STRING,
            },
        }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('posts'),
}
