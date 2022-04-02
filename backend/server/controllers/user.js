import models from '../../database/models'
import Authentication from '../../middlewares/authentication'
import UserDTO from '../../dto/users'
import Activity from '../../enums/activity'
import Notifications from '../../enums/notifications'
import UserHandleDTO from '../../dto/userHandle'

export const addUser = async (req, res) => {
  try {
    const { body } = req

    const duplicateUsername = await models.users.findOne({
      where: {
        username: body.username,
      },
    })

    if (duplicateUsername) {
      res.status(409).send({ error: 'Username already taken' })
      return
    }

    const duplicateEmail = await models.users.findOne({
      where: {
        email: body.email,
      },
    })

    if (duplicateEmail) {
      res.status(409).send({ error: 'Email has already been taken' })
      return
    }

    const createUser = await models.users.create({
      username: body.username,
      nickname: body.nickname,
      email: body.email,
      password: body.password,
    })
    const authToken = Authentication.generateAuthToken(createUser)
    res.status(201).send({
      message: 'User successfully created',
      authToken,
      username: createUser.username,
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

export const getUserHandles = async (req, res) => {
  try {
    const decodedUser = res.locals.decodedUser

    // Find all users which are not equal to userId
    const users = await models.users.findAll({
      where: {
        id: {
          [models.Sequelize.Op.ne]: decodedUser.id,
        },
      },
    })

    const usernames = users.map((user) => UserHandleDTO.convertToDto(user))

    res.status(200).send({
      usernames,
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

export const getUsersByUsername = async (req, res) => {
  try {
    const { params } = req
    const user = await models.users.findOne({
      where: {
        username: params.username,
      },
    })
    if (!user) {
      res.status(404).send({
        error: `User '${params.username}' not found`,
      })
      return
    }

    const userDTO = await UserDTO.convertToDto(user)
    res.status(200).send(userDTO)
  } catch (error) {
    res.status(500).send({ 'Error message': error.toString() })
  }
}

export const authenticateUser = async (req, res) => {
  try {
    const { body } = req
    const user = await models.users.findOne({
      where: {
        email: body.email,
      },
    })

    if (!user || !user.validatePassword(body.password)) {
      res.status(401).send({
        error: 'Incorrect email or password',
      })
    } else {
      const authToken = Authentication.generateAuthToken(user)
      res.status(200).send({
        message: 'Authentication successful',
        authToken,
        username: user.username,
      })
    }
  } catch (error) {
    res.status(500).send({ 'Error message': error.toString() })
  }
}

export const getUserActivity = async (req, res) => {
  try {
    const { params } = req
    const userOfInterest = await models.users.findOne({
      where: {
        username: params.username,
      },
    })
    if (!userOfInterest) {
      res.status(404).send({
        error: `User '${params.username}' not found`,
      })
      return
    }

    const authToken = req.get('Authorization')

    if (!authToken) {
      res.status(400).send({
        'Error message': 'Auth token not provided',
      })
    }

    const loggedInUser = Authentication.extractUser(authToken)

    if (!loggedInUser) {
      res.status(401).send({
        'Error message': 'Auth token invalid',
      })
      return
    }

    let activities = await Activity.getUserActivities(userOfInterest.id)
    activities.sort((a, b) => {
      return a.timestamp < b.timestamp ? 1 : -1
    })

    res.status(200).send(activities)
  } catch (error) {
    res.status(500).send({ 'Error message': error.toString() })
  }
}

export const getFeed = async (req, res) => {
  try {
    const loggedInUser = res.locals.decodedUser

    const following = await models.followers.findAll({
      where: {
        followerId: loggedInUser.id,
      },
    })

    let activities = await Activity.retrieveActivityFeed(following)

    res.status(200).send(activities)
  } catch (error) {
    res.status(500).send({ 'Error message': error.toString() })
  }
}

export const getNotifications = async (req, res) => {
  try {
    const loggedInUser = res.locals.decodedUser
    const notifications = await Notifications.retrieveNotifications(
      loggedInUser.id
    )
    res.status(200).send(notifications)
  } catch (error) {
    res.status(500).send({ 'Error message': error.toString() })
  }
}

export const followUser = async (req, res) => {
  try {
    const { params } = req
    const user = await models.users.findOne({
      where: {
        username: params.username,
      },
    })
    if (!user) {
      res.status(404).send({
        error: `User '${params.username}' not found`,
      })
      return
    }
    const decodedUser = res.locals.decodedUser

    const alreadyFollow = await models.followers.findOne({
      where: {
        followedId: user.id,
        followerId: decodedUser.id,
      },
    })
    if (alreadyFollow) {
      res.status(409).send({ error: 'Already following this user' })
    } else {
      const follow = await models.followers.create({
        followedId: user.id,
        followerId: decodedUser.id,
      })
      res.status(201).send(follow)
    }
  } catch (error) {
    res.status(500).send({ 'Error message': error.toString() })
  }
}

export const unfollowUser = async (req, res) => {
  try {
    const { params } = req
    const user = await models.users.findOne({
      where: {
        username: params.username,
      },
    })
    if (!user) {
      res.status(404).send({
        error: `User '${params.username}' not found`,
      })
      return
    }
    const decodedUser = res.locals.decodedUser

    const alreadyFollow = await models.followers.findOne({
      where: {
        followedId: user.id,
        followerId: decodedUser.id,
      },
    })
    if (!alreadyFollow) {
      res.status(404).send({ error: 'Already not following this user' })
    } else {
      const unfollow = await alreadyFollow.destroy()
      res.status(200).send(unfollow)
    }
  } catch (error) {
    res.status(500).send({ 'Error message': error.toString() })
  }
}

/*
Require authentication. (only you can see list of follower and followings)
Path paramter: username - the username of the account we want
    to get following and followers for.
Response Codes:
200 OK when the followers and following has been successfully found.
404 NOT FOUND when the post with that id can not be found.
500 INTERNAL SERVER ERROR for everything else.
Returns : List of followers and followings.
*/
export const getFollow = async (req, res) => {
  try {
    const { params } = req

    const decodedUser = res.locals.decodedUser
    const user = await models.users.findOne({
      where: { username: params.username },
    })

    if (!user) {
      res.status(400).send({
        'Error message':
          'Invalid param : user with given username does not exist',
      })
      return
    }

    if (decodedUser.id) {
      // retrieve id of users
      const followersIds = await models.followers
        .findAll({
          where: { followedId: user.id },
        })
        .then((followers) => followers.map((follower) => follower.followerId))
      const followingIds = await models.followers
        .findAll({
          where: { followerId: user.id },
        })
        .then((followings) =>
          followings.map((following) => following.followedId)
        )

      // retrieve user object
      const followersUsers = await models.users.findAll({
        where: { id: followersIds },
      })
      const followingUsers = await models.users.findAll({
        where: { id: followingIds },
      })

      // Transform to DTO
      const followersDTO = await Promise.all(
        followersUsers.map(async (u) => {
          const userDTO = await UserDTO.convertToDto(u)
          return userDTO
        })
      )
      const followeringDTO = await Promise.all(
        followingUsers.map(async (u) => {
          const userDTO = await UserDTO.convertToDto(u)
          return userDTO
        })
      )

      const follow = {
        following: followeringDTO,
        followers: followersDTO,
      }
      res.status(200).send(follow)
    } else {
      res.status(403).send('Invalid author ID.')
    }
  } catch (error) {
    res.status(500).send({ 'Error message': error.toString() })
  }
}

export const modifyUser = async (req, res) => {
  try {
    const loggedInUser = res.locals.decodedUser
    const { body } = req

    const updatedUser = await models.users.update(
      {
        username: body.username,
        nickname: body.nickname,
        bio: body.bio,
        profilePic: body.profilePic,
        profileBanner: body.profileBanner,
      },
      { returning: true, where: { id: loggedInUser.id } }
    )

    if (updatedUser) {
      res.status(200).send({ message: 'The profile has been updated.' })
    } else {
      res.status(500).send({ error: 'Failed to update the profile.' })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

export const deleteUser = async (req, res) => {
  try {
    const loggedInUser = res.locals.decodedUser

    const deleteUser = await models.users.destroy({
      where: { id: loggedInUser.id },
    })

    if (deleteUser !== 0) {
      res.status(200).send({ message: 'The user has been deleted.' })
    } else {
      res.status(500).send({ error: 'Failed to destroy the user.' })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}
