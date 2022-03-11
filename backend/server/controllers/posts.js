import { initializeApp, cert } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'
import path from 'path'
import models from '../../database/models'
import { Authentication } from '../../middlewares/authentication'

// Temporary method for testing/developing
export const getImage = async (req, res) => {
    console.log('Fetching Image : received a query')
    try {
        const serviceAccount = require('/Users/Goyard/Desktop/2022_Sem1_UoA/SoftEng701/Updog/backend/updog-58ba9-firebase-adminsdk-37xms-fe6982697e.json')
        initializeApp({
            credential: cert(serviceAccount),
            storageBucket: 'gs://updog-58ba9.appspot.com',
        })
        const bucket = getStorage().bucket()

        async function downloadFile(fileName, downloadDestination) {
            const options = {
                destination: downloadDestination,
            }
            // Downloads the file
            await bucket.file(fileName).download(options)

            console.log(
                `gs://${bucketName}/${fileName} downloaded to ${destFileName}.`
            )
        }

        downloadFile(
            'Post_images/1646976072501-7bjws-small_image.png',
            'Downloaded_images/1646976072501-7bjws-small_image.png'
        ).catch(console.error)
        res.status(201).send()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function uploadFileToCloudStorage(filename) {
    const serviceAccount = require('/Users/Goyard/Desktop/2022_Sem1_UoA/SoftEng701/Updog/backend/updog-58ba9-firebase-adminsdk-37xms-fe6982697e.json')
    initializeApp({
        credential: cert(serviceAccount),
        storageBucket: 'gs://updog-58ba9.appspot.com',
    })
    const bucket = getStorage().bucket()

    await bucket.upload(`./Images/${filename}`, {
        destination: 'Post_images/' + filename,
    })
    console.log(`uploaded file : ${filename}`)
}

/*
Requires authentication.
Response codes:
201 CREATED when the post has successfully been created.
500 INTERNAL SERVER ERROR otherwise.
*/
export const createPost = async (req, res) => {
    console.log('post receieved')

    try {
        const authToken = req.get('Authorization')
        const { body } = req
        let attachmentLink = ''

        if (!authToken) {
            res.status(400).send({
                'Error message': 'Auth token not provided',
            })
        } else {
            const decodedUser = Authentication.extractUser(authToken)

            if (!decodedUser.id) {
                res.status(401).send({ 'Error message': 'Auth token invalid' })
            }

            if (req.files) {
                console.log(req.files.attachments)

                const file = req.files.attachments
                const newFilename = `${Date.now()}-${Math.random()
                    .toString(36)
                    .slice(-5)}-${file.name}`

                attachmentLink = newFilename
                // Use the mv() method to place the file somewhere on your server
                file.mv(`./Images/${newFilename}`, null)

                uploadFileToCloudStorage(newFilename).catch(console.error)
            }

            // Check whether the parent post exists.
            const parent = await models.posts.findByPk(body.parent)

            if (parent || body.parent == null) {
                /*
                NOTE: attachments is currently a STRING type as the attachment functionality has not been setup yet.
                */
                const createNewPost = await models.posts.create({
                    text_content: body.text_content,
                    author: decodedUser.id,
                    parent: body.parent,
                    usersLiked: 0,
                    usersShared: 0,
                    attachments: attachmentLink,
                })
                res.status(201).send(createNewPost)
            } else {
                res.status(404).send({
                    'Error message': 'Parent with that id does not exist.',
                })
            }
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
        // Authentication
        const authToken = req.get('Authorization')

        if (!authToken) {
            res.status(400).send({
                'Error message': 'Auth token not provided',
            })
        } else {
            const decodedUser = Authentication.extractUser(authToken)

            if (!decodedUser.id) {
                res.status(401).send({
                    'Error message': 'Auth token invalid',
                })
            } else {
                const { params, body } = req

                // Check whether the post being updated belongs to that user.
                const post = await models.posts.findByPk(params.id)
                if (!post) {
                    res.status(404).send('Invalid message ID.')
                } else if (post.author === decodedUser.id) {
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
                        res.status(400).send('Update failed.')
                    }
                } else {
                    res.status(403).send('Invalid author ID.')
                }
            }
        }
    } catch (error) {
        console.log(error)
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
        } else {
            const decodedUser = Authentication.extractUser(authToken)

            if (!decodedUser.id) {
                res.status(401).send({
                    'Error message': 'Auth token invalid',
                })
            } else {
                const { params } = req

                // Check whether the post being deleted belongs to that user.
                const post = await models.posts.findByPk(params.id)
                if (!post) {
                    res.status(404).send('Invalid message ID.')
                } else if (post.author === decodedUser.id) {
                    const count = await models.posts.destroy({
                        where: { id: params.id },
                    })
                    if (count !== 0) {
                        res.status(200).send('The message has been deleted.')
                    } else {
                        res.status(400).send('Failed to update.')
                    }
                } else {
                    res.status(403).send('Invalid author ID.')
                }
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
