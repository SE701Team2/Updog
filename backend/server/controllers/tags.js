import models from '../../database/models'
import TagDTO from '../../dto/tags'
import Authentication from '../../middlewares/authentication'

//Requires Authentication
//Path parameter: tagName - the string of the tag to be created
//Response codes:
//200 OK - Tag already exists, returns the id of existing tag
//201 Created - Tag has been created and return id of new tag
//401 Unauthorized - if auth token is not provided or invalid
//500 INTERNAL SERVER ERROR for everything else

export const createTag = async (req, res) => {
  try {
    const authToken = req.get('Authorization')
    const { tagName } = req.body

    if (!authToken) {
      res.status(401).send({
        'Error message': 'Auth token not provided',
      })
    } else {
      const decodedUser = Authentication.extractUser(authToken)

      if (!decodedUser.id) {
        res.status(401).send({ 'Error message': 'Auth token invalid' })
      }

      const existingTag = await models.tags.getTagByName(tagName)
      //Check if a tag already exists with that name
      if (existingTag !== null) {
        const tagDTO = await TagDTO.convertToDTO(existingTag)
        res.status(200).send(tagDTO)
      } else {
        //Create a new tag and return the id
        const newTag = await models.tags.create({
          tagName: tagName,
        })
        const tagDTO = await TagDTO.convertToDTO(newTag)
        res.status(201).send(tagDTO)
      }
    }
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
    const authToken = req.get('Authorization')

    if (!authToken) {
      res.status(401).send({
        'Error message': 'Auth token not provided',
      })
    } else {
      const decodedUser = Authentication.extractUser(authToken)

      if (!decodedUser.id) {
        res.status(401).send({ 'Error message': 'Auth token invalid' })
      }

      const tagList = await models.tags.getAllTags()
      const tagDTOList = await Promise.all(
        tagList.map((tag) => TagDTO.convertToDTO(tag))
      )

      res.status(200).send(tagDTOList)
    }
  } catch (error) {
    res.status(500).send(error)
  }
}
