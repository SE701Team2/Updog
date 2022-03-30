import models from '../../database/models'
import TagDTO from '../../dto/tags'

//Requires Authentication
//Path parameter: tagName - the string of the tag to be created
//Response codes:
//200 OK - Tag created or already exists & returns the id of existing tag
//401 Unauthorized - if auth token is not provided or invalid
//500 INTERNAL SERVER ERROR for everything else

export const createTag = async (req, res) => {
  try {
    const { tagName } = req.body

    const tag = await checkAndCreateTag(tagName)
    res.status(200).send(TagDTO.convertToDTO(tag))
  } catch (error) {
    res.status(500).send(error)
  }
}

//Requires Authentication
//Response codes:
//200 OK - successful and returns with a list of tagDTO of all tags in the database
//401 Unauthorized - if auth token is not provided or invalid
//500 INTERNAL SERVER ERROR for everything else

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

export const checkAndCreateTag = async (tagName) => {
  const existingTag = await models.tags.getTagByName(tagName)
  //Check if a tag already exists with that name
  if (existingTag !== null) {
    return existingTag
  }
  //Create a new tag and return the id
  const newTag = await models.tags.create({
    tagName: tagName,
  })
  return newTag
}
