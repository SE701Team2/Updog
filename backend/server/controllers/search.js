import PostDTO from '../../dto/posts'
import UserDTO from '../../dto/users'
import models from '../../database/models'

const Sequelize = require('sequelize')

/*
Does not require authentication.
Query parameters:
query - the search query
type - the type of data to search for: top/latest/people
        Top returns search results sorted by their likes
        Latest returns most recent search results
        People returns any users who match the search
Response Codes:
200 OK when the data has been successfully found.
400 BAD REQUEST when one of the query parameters is missing
500 INTERNAL SERVER ERROR for everything else.
*/
export const search = async (req, res) => {
  try {
    const { query } = req

    if (!query.query) {
      res.status(400).send('Query parameter "query" required')
      return
    } else if (!query.type) {
      res.status(400).send('Query parameter "type" required')
      return
    }

    if (query.type == 'people') {
      const users = await getUsersByQuery(query.query)
      const userDtos = await generateUserDtos(users)
      res.status(200).send(userDtos)
    } else {
      const posts = await getPostsByQuery(query.query)
      const postDtos = await generatePostDtos(posts, query.type)
      res.status(200).send(postDtos)
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

const getUsersByQuery = async (query) => {
  return await models.users.findAll({
    where: {
      [Sequelize.Op.or]: [
        { username: { [Sequelize.Op.like]: '%' + query + '%' } },
        { email: { [Sequelize.Op.like]: '%' + query + '%' } },
        { nickname: { [Sequelize.Op.like]: '%' + query + '%' } },
      ],
    },
    raw: true,
  })
}

const generateUserDtos = async (users) => {
  const userDtos = []
  await Promise.all(
    users.map(async (user) => {
      const userDto = await UserDTO.convertToDto(user)
      userDtos.push(userDto)
    })
  )
  return userDtos
}

const getPostsByQuery = async (query) => {
  return await models.posts.findAll({
    where: {
      text_content: { [Sequelize.Op.like]: '%' + query + '%' },
    },
    order: [['createdAt', 'DESC']],
    raw: true,
  })
}

const generatePostDtos = async (posts, sortBy) => {
  const postDtos = []
  await Promise.all(
    posts.map(async (post) => {
      const postDto = await PostDTO.convertToDto(post)
      postDtos.push(postDto)
    })
  )

  // Posts are by default sorted by their createdAt time
  if (sortBy === 'top') {
    postDtos.sort((a, b) => {
      return b.usersLiked - a.usersLiked
    })
  }
  return postDtos
}
