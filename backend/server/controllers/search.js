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

    if (!query.type) {
      res.status(400).send('Query parameter "type" required')
      return
    }

    if (query.type == 'people') {
      const users = await (query.query
        ? getUsersByQuery(query.query)
        : getUsers())
      const userDtos = await generateUserDtos(users)
      res.status(200).send(userDtos)
    } else {
      const posts = await (query.query
        ? getPostsByQuery(query.query)
        : getPosts())
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
        {
          username: Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('username')),
            'LIKE',
            '%' + query.toLowerCase() + '%'
          ),
        },
        {
          email: Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('email')),
            'LIKE',
            '%' + query.toLowerCase() + '%'
          ),
        },
        {
          nickname: Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('nickname')),
            'LIKE',
            '%' + query.toLowerCase() + '%'
          ),
        },
      ],
    },
    order: [['createdAt', 'DESC']],
    raw: true,
  })
}

const getUsers = async () => {
  return await models.users.findAll({
    order: [['createdAt', 'DESC']],
    raw: true,
  })
}

const generateUserDtos = async (users) => {
  const userDtos = await Promise.all(
    users.map((user) => UserDTO.convertToDto(user))
  )
  return userDtos
}

const getPostsByQuery = async (query) => {
  return await models.posts.findAll({
    where: {
      text_content: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('text_content')),
        'LIKE',
        '%' + query.toLowerCase() + '%'
      ),
    },
    order: [['createdAt', 'DESC']],
    raw: true,
  })
}

const getPosts = async () => {
  return await models.posts.findAll({
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
