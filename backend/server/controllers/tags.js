import models from '../../database/models'
import TagDTO from '../../dto/tags'

/**
 * Create a new tags
 * @Deprecated tags are created on post requests in tags.js/checkAndcreateTag()
 *
 * Requires Authentication
 *
 * Path parameter: tagName - the string of the tag to be created
 *
 * Response codes:
 * 200 OK - Tag created or already exists & returns the id of existing tag
 * 401 Unauthorized - if auth token is not provided or invalid
 * 500 INTERNAL SERVER ERROR for everything else
 */
export const createTag = async (req, res) => {
  try {
    const { tagName } = req.body

    const tag = await checkAndCreateTag(tagName)
    res.status(200).send(TagDTO.convertToDTO(tag))
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Retrieves a list of al tags in the database
 *
 * Requires Authentication
 *
 * Response codes:
 * 200 OK - All Tags in database returned as DTO
 * 500 INTERNAL SERVER ERROR for everything else
 */
export const getTags = async (req, res) => {
  try {
    const tagList = await models.tags.getAllTags()
    const tagDTOList = await Promise.all(
      tagList.map((tag) => TagDTO.convertToDTO(tag))
    )

    res.status(200).send(tagDTOList)
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Checks if a tag exists in the database and returns the id
 * If a tag does not exist in the database it creates an entry and returns the new id
 */
export const checkAndCreateTag = async (tagName) => {
  const existingTag = await models.tags.getTagByName(tagName)
  // Check if a tag already exists with that name
  if (existingTag !== null) {
    return existingTag
  }
  // Create a new tag and return the id
  const newTag = await models.tags.create({
    tagName: tagName,
  })
  return newTag
}
