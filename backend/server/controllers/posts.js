import models from '../../database/models'
import { Authentication } from '../../middlewares/authentication'

/*
Requires authentication.
Response codes:
201 CREATED when the post has successfully been created.
500 INTERNAL SERVER ERROR otherwise.
*/
export const createPost = async (req, res) => {
    try {
        const authToken = req.get('Authorization')
        const { body } = req

        if (!authToken) {
            res.status(400).send({
                'Error message': 'Auth token not provided',
            })
        } else {
            const decodedUser = Authentication.extractUser(authToken)

            if (!decodedUser.id) {
                res.status(401).send({ 'Error message': 'Auth token invalid' })
            }

            /*
            NOTE: attachments is currently a STRING type as the attachment functionality has not been setup yet.
            */
            const createNewPost = await models.posts.create({
                text_content: body.text_content,
                author: decodedUser.id,
                parent: body.parent,
                usersLiked: 0,
                usersShared: 0,
                attachments: '',
            })
            res.status(201).send(createNewPost)
        }
    } catch (error) {
        console.log(error)
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
