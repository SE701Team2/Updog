import bucket from '../../config/cloudstorage'
import models from '../../database/models'
import { convertToPostDto } from '../../dto/posts'
import { Authentication } from '../../middlewares/authentication'

// Upload a file to the storage, then create attachment object to be appended into the Database.
async function uploadFileToCloud(file, postID) {
    const newFilename = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(-5)}-${file.name}`

    // Moving a file from memory to disk.
    // TODO : Preferbly we want to upload straight from memory.
    await file.mv(`./images_upload/${newFilename}`, null)

    // Uploading to the cloud storage
    await bucket.upload(`./images_upload/${newFilename}`, {
        destination: `Post_images/${newFilename}`,
    })

    // Creating a object for database.
    await models.attachments.create({
        postID,
        attachmentLink: `Post_images/${newFilename}`,
    })
    console.log(`uploaded file : ${newFilename}`)
}

// Download a file from the storage
async function downloadFileFromCloudStorage(filename) {
    const options = {
        destination: `images_download/${filename}`,
    }
    // Downloads the file
    await bucket.file(`Post_images/${filename}`).download(options)
    console.log(
        `Post_images/${filename} downloaded to ${`Downloaded_images/${filename}`}.`
    )
}

// Example method for downloading File from Cloud Storage
export const getImage = async (req, res) => {
    console.log('Fetching Image : received a query')
    try {
        downloadFileFromCloudStorage(req.body.attachments).catch(console.error)
        res.status(201).send()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

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

            // Check whether the parent post exists.
            const parent = await models.posts.findByPk(body.parent)

            if (parent || body.parent == null) {
                /*
                NOTE: attachments is currently a STRING type as the attachment functionality has not been setup yet.
                */
                const post = await models.posts.create({
                    text_content: body.text_content,
                    author: decodedUser.id,
                    parent: body.parent,
                })
                const postDTO = await convertToPostDto(post)

                if (req.files) {
                    const file = req.files.attachments
                    if (!!file && file.constructor === Array) {
                        file.forEach(async (x) => {
                            uploadFileToCloud(x, post.id)
                        })
                    } else {
                        uploadFileToCloud(file, post.id)
                    }
                }
                res.status(201).send(postDTO)
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
            const postDTO = await convertToPostDto(post)
            res.status(200).send(postDTO)
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
                        },
                        { returning: true, where: { id: params.id } }
                    )
                    if (updated) {
                        res.status(200).send('The message has been updated.')
                    } else {
                        res.status(500).send('Failed to update the post.')
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
                    res.status(404).send('Invalid post ID.')
                } else if (post.author === decodedUser.id) {
                    const count = await models.posts.destroy({
                        where: { id: params.id },
                    })
                    if (count !== 0) {
                        res.status(200).send('The post has been deleted.')
                    } else {
                        res.status(500).send('Failed to destroy the post.')
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

/*
Requires authentication.
Path paramter: id - the id of the post that user has liked.
Response Codes:
200 OK when the post has been successfully modified.
404 NOT FOUND when the post with that id can not be found.
500 INTERNAL SERVER ERROR for everything else.
*/
export const likePost = async (req, res) => {
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
                } else {
                    const likePost = await models.likedPost.create({
                        postId: params.id,
                        userId: decodedUser.id,
                    })

                    res.status(201).send(likePost)
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
Path paramter: id - the id of the post that user has liked.
Response Codes:
200 OK when the post has been successfully modified.
404 NOT FOUND when the post with that id can not be found.
500 INTERNAL SERVER ERROR for everything else.
*/
export const unlikePost = async (req, res) => {
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

                // Check whether the post being deleted belongs to that user.
                const post = await models.posts.findByPk(params.id)
                if (!post) {
                    res.status(404).send('Invalid post ID.')
                } else if (post.author === decodedUser.id) {
                    const count = await models.likedPost.destroy({
                        where: { postId: params.id, userId: decodedUser.id },
                    })
                    if (count !== 0) {
                        res.status(200).send('The post has been deleted.')
                    } else {
                        res.status(500).send('Failed to destroy the post.')
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
