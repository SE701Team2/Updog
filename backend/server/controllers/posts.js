/* eslint-disable no-console */
import bucket from '../../config/cloudstorage'
import models from '../../database/models'
import PostDTO from '../../dto/posts'
import { checkAndCreateTag } from './tags'
import Interactions from '../../enums/interactions'

/**
 * Upload a file to the storage, then create attachment object to be appended into the Database.
 * @Deprecated use ./image.js/uploadImageToBucket instead
 */
async function uploadFileToCloud(file, postID) {
  const newFilename = `${Date.now()}-${Math.random().toString(36).slice(-5)}-${
    file.name
  }`

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

/**
 * Downloads a given file from the cloud storage
 * @Deprecated use ./image.js/downloadImageFromBucket instead
 */
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

/**
 * Retrieves an image file from the cloud storage
 *
 * Requires authentication.
 *
 * Response codes:
 * 201 CREATED when finished
 * 500 INTERNAL SERVER ERROR otherwise
 * @Deprecated use ./image.js/getImage instead
 */
export const getImage = async (req, res) => {
  try {
    downloadFileFromCloudStorage(req.body.attachments).catch(console.error)
    res.status(201).send()
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Handles a request for creating a new post in the system
 *
 * Requires authentication.
 *
 * Request body: details of new post
 *
 * Response codes:
 * 201 CREATED when the post has successfully been created.
 * 404 NOT FOUND if a parent post id not found
 * 500 INTERNAL SERVER ERROR otherwise.
 */
export const createPost = async (req, res) => {
  try {
    const { body } = req
    const decodedUser = res.locals.decodedUser

    // Check whether the parent post exists.
    const parent = await models.posts.findByPk(body.parent)

    if (parent || body.parent == null) {
      // Create the post in the database.
      const post = await models.posts.create({
        text_content: body.text_content,
        author: decodedUser.id,
        parent: body.parent,
      })
      const postDTO = await PostDTO.convertToDto(post, decodedUser.id)

      if (!body.tagIds) {
        body.tagIds = []
      }
      // Create any new tags and populate the postTag database with new records
      if (body.tagIds || body.newTags) {
        const newTagIds = await createNewTags(body.newTags)
        if (newTagIds != null) {
          body.tagIds = [...body.tagIds, ...newTagIds]
        }
        await createPostTags(body.tagIds, post.id)
      }

      // Check for any file attachments and upload to the cloud
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
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Retrieves a specific post by its ID in the database
 *
 * Requires authentication.
 *
 * Path paramter: id - the id of the post that is being retrieved.
 *
 * Response Codes:
 * 200 OK when the post has been successfully found.
 * 404 NOT FOUND when the post with that id can not be found.
 * 500 INTERNAL SERVER ERROR for everything else.
 */
export const getPostById = async (req, res) => {
  try {
    // Check whether a post with the id exists.
    const { params } = req
    const post = await models.posts.findByPk(params.id)
    const decodedUser = res.locals?.decodedUser
    if (post != null) {
      // Returns the postDTO object if a post with the id exists.
      const postDTO = await PostDTO.convertToDto(post, decodedUser?.id)
      res.status(200).send(postDTO)
    } else {
      res.status(404).send('ID not found.')
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Modifies a post from the given ID with the updated text if it belongs to the user
 *
 * Requires authentication.
 *
 * Path paramter: id - the id of the post that is being modified.
 * Request Body: new text content for post
 *
 * Response Codes:
 * 200 OK when the post has been successfully modified.
 * 403 FORBIDDEN if the user is trying to edit a post thats not theirs
 * 404 NOT FOUND when the post with that id can not be found.
 * 500 INTERNAL SERVER ERROR for everything else.
 */
export const modifyPostById = async (req, res) => {
  try {
    const decodedUser = res.locals.decodedUser
    const { params, body } = req

    // Check whether the post being updated belongs to that user.
    const post = await models.posts.findByPk(params.id)
    if (!post) {
      res.status(404).send('Invalid message ID.')
      return
    }
    if (post.author !== decodedUser.id) {
      res.status(403).send('Invalid author ID.')
      return
    }
    // Update the selected row in the database.
    const updated = await models.posts.update(
      {
        text_content: body.text_content,
      },
      { returning: true, where: { id: params.id } }
    )

    if (!updated) {
      res.status(500).send('Failed to update the post.')
      return
    }

    res.status(200).send('The message has been updated.')
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Deletes a post by the given id
 *
 * Requires authentication.
 *
 * Path parameter: id - the id of the post that is being deleted.
 *
 * Response Codes:
 * 200 OK when the post has been successfully deleted.
 * 403 FORBIDDEN invalid author id provided
 * 404 NOT FOUND when the post with that id can not be found.
 * 500 INTERNAL SERVER ERROR for everything else.
 */
export const deletePostById = async (req, res) => {
  try {
    const decodedUser = res.locals.decodedUser
    const { params } = req

    // Check whether the post being deleted belongs to that user.
    const post = await models.posts.findByPk(params.id)
    if (!post) {
      res.status(404).send('Invalid post ID.')
      return
    }

    if (post.author !== decodedUser.id) {
      res.status(403).send('Invalid author ID.')
      return
    }

    const count = await models.posts.destroy({
      where: { id: params.id },
    })
    if (count === 0) {
      res.status(500).send('Failed to destroy the post.')
      return
    }

    res.status(200).send('The post has been deleted.')
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Handles liking of a new post
 *
 * Requires authentication.
 *
 * Path paramter: id - the id of the post that user has liked.
 *
 * Response Codes:
 * 201 CREATED when the post has been successfully modified.
 * 404 NOT FOUND when the post with that id can not be found.
 * 500 INTERNAL SERVER ERROR for everything else.
 */
export const likePost = async (req, res) => {
  try {
    const decodedUser = res.locals.decodedUser
    const { params } = req

    // Check whether the post being updated belongs to that user.
    const post = await models.posts.findByPk(params.id)
    if (!post) {
      res.status(404).send('Invalid message ID.')
      return
    }

    const likedPost = await models.likedPost.create({
      postId: params.id,
      userId: decodedUser.id,
    })

    res.status(201).send(likedPost)
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Handles when a user unlikes a post they have previously liked
 *
 * Requires authentication.
 *
 * Path paramter: id - the id of the post that user has unliked.
 *
 * Response Codes:
 * 200 OK when the post has been successfully modified.
 * 404 NOT FOUND when the post with that id can not be found.
 * 500 INTERNAL SERVER ERROR for everything else.
 */
export const unlikePost = async (req, res) => {
  try {
    const decodedUser = res.locals.decodedUser

    const { params } = req

    const count = await models.likedPost.destroy({
      where: { postId: params.id, userId: decodedUser.id },
    })

    if (count === 0) {
      // User has not liked that post. (or the post itself does not exist)
      res.status(404).send('Failed to destroy the likedPost.')
      return
    }

    res.status(200).send('The likedPost has been deleted.')
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Allows a user to share a post by id
 *
 * Requires authentication.
 *
 * Path paramter: id - the id of the post that user has unshared.
 *
 * Response Codes:
 * 201 CREATED when the post has been shared
 * 404 NOT FOUND when the post with that id can not be found.
 * 500 INTERNAL SERVER ERROR for everything else.
 */
export const sharePostById = async (req, res) => {
  try {
    const { params } = req
    const decodedUser = res.locals.decodedUser

    // Check whether the post id is valid.
    const targetPost = await models.posts.findByPk(params.id)

    if (targetPost) {
      // Share the post.
      const postShared = await models.sharedPost.create({
        postId: targetPost.id,
        userId: decodedUser.id,
      })
      if (postShared) {
        res.status(201).send('Post shared.')
      } else {
        res.status(500).send('Failed to share the post.')
      }
    } else {
      res.status(404).send({
        'Error message': 'Post with that id does not exist.',
      })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Allows a user to unshare a post by id
 *
 * Requires authentication.
 *
 * Path paramter: id - the id of the post that user has shared.
 *
 * Response Codes:
 * 200 OK when the post has been shared
 * 404 NOT FOUND when the post with that id can not be found.
 * 500 INTERNAL SERVER ERROR for everything else.
 */
export const unsharePostById = async (req, res) => {
  try {
    const { params } = req
    const decodedUser = res.locals.decodedUser

    // Delete the tuple that indicates the post has been shared by the user.
    const count = await models.sharedPost.destroy({
      where: { postId: params.id, userId: decodedUser.id },
    })

    if (count) {
      res.status(200).send('The post has been unshared.')
    } else {
      res.status(404).send('The post was not shared by the user before.')
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Get a list of interated users (e.g users that shared and liked a post)
 *
 * Requires authentication.
 *
 * Path paramter: id - the id of the post that user has shared.
 *
 * Response Codes:
 * 200 OK sends back a list of interacted users
 * 404 NOT FOUND when the post with that id can not be found.
 * 500 INTERNAL SERVER ERROR for everything else.
 */
export const getInteractedUsers = async (req, res) => {
  try {
    const { params } = req
    const post = await models.posts.findOne({
      where: {
        id: params.id,
      },
    })
    if (!post) {
      res.status(404).send({
        error: `Post with id '${params.id}' not found`,
      })
      return
    }

    // Return userDTO arrays for the likes and shares on that post
    const usersThatLiked = await Interactions.getUsersThatLiked(post.id)
    const usersThatShared = await Interactions.getUsersThatShared(post.id)

    const interactions = {
      likes: usersThatLiked,
      shares: usersThatShared,
    }
    res.status(200).send(interactions)
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 *  Handles creating new tags that the user has made
 *  Returns a list of all the tag ids associated with a post
 */
const createNewTags = (newTags) => {
  if (newTags == null) {
    return []
  }
  // Creates new tags for the list of tagNames given, and returns the ids
  return Promise.all(
    newTags.map(async (tagName) => (await checkAndCreateTag(tagName)).id)
  )
}

/**
 *  Handles creating new postTag entries associating a post with a specific tag
 */
const createPostTags = (tagIds, postId) => {
  if (tagIds == null) {
    return []
  }
  // Creates new postTag records for the database
  return Promise.all(
    tagIds.map((tag) => {
      return models.postTag.create({
        postId: postId,
        tagId: tag,
      })
    })
  )
}
