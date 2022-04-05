import models from '../../database/models'

/**
 * Inserts an array of tags names to user interests
 *
 * Request Body: an array of interests
 *
 * Reponse Codes:
 * 200 OK on success
 * 500 INTERNAL SERVER ERROR on errors
 */
export const addInterests = async (req, res) => {
  try {
    const { body } = req
    const decodedUser = res.locals.decodedUser
    const interests = body.interests

    const tags = await models.tags.findAll({
      where: {
        tagName: {
          [models.Sequelize.Op.in]: interests,
        },
      },
    })

    await models.userInterests.bulkCreate(
      tags.map((tag) => ({
        userId: decodedUser.id,
        tagId: tag.id,
      }))
    )

    res.status(201).send({
      Message: 'Interests added successfully',
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Gets an array of tag names from user interests
 *
 * Requires authentication.
 *
 * Reponse Codes:
 * 200 OK and an array of tag names on success
 * 500 INTERNAL SERVER ERROR on errors
 */
export const getInterests = async (req, res) => {
  try {
    const decodedUser = res.locals.decodedUser

    const userInterests = await models.userInterests.findAll({
      where: {
        userId: decodedUser.id,
      },
    })

    const interests = userInterests.map((interest) => interest.tagId)

    const tags = await models.tags.findAll({
      where: {
        id: {
          [models.Sequelize.Op.in]: interests,
        },
      },
    })

    res.status(200).send({
      Interests: tags.map((tag) => tag.tagName),
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Deletes an array of tags names from user interests
 *
 * Requires authentication.
 *
 * Request Body: an array of interests
 *
 * Reponse Codes:
 * 200 OK on success
 * 500 INTERNAL SERVER ERROR on errors
 */
export const deleteInterests = async (req, res) => {
  try {
    const { body } = req
    const decodedUser = res.locals.decodedUser

    const interests = body.interests

    const tags = await models.tags.findAll({
      where: {
        tagName: {
          [models.Sequelize.Op.in]: interests,
        },
      },
    })

    await models.userInterests.destroy({
      where: {
        userId: decodedUser.id,
        tagId: {
          [models.Sequelize.Op.in]: tags.map((tag) => tag.id),
        },
      },
    })

    res.status(200).send({
      Message: 'Interests removed successfully',
    })
  } catch (error) {
    res.status(500).send(error)
  }
}
