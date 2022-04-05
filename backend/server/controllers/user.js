import models from '../../database/models'
import Authentication from '../../middlewares/authentication'
import UserDTO from '../../dto/users'
import Activity from '../../enums/activity'
import Notifications from '../../enums/notifications'
import UserHandleDTO from '../../dto/userHandle'

/**
 * Add a new user
 *
 * Does not requires Authentication
 *
 * Request Body: new user details
 *
 * Response Codes:
 * 201 CREATED when the new user has been successfully added.
 * 409 CONFLICT when username/email has already been taken
 * 500 INTERNAL SERVER ERROR for everything else.
 */
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

/**
 * Get a list of all users for user handles
 *
 * Requires Authentication
 *
 * Response Codes:
 * 200 OK sends a list of users
 * 500 INTERNAL SERVER ERROR for everything else.
 */
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

/**
 * Get a specific user by their username
 *
 * Requires Authentication
 *
 * Path parameter: username - the username of the user
 *
 * Response Codes:
 * 200 OK sends user info from username
 * 404 NOT FOUND if no user is found
 * 500 INTERNAL SERVER ERROR for everything else.
 */
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

/**
 * Handles the logging in of a user account
 *
 * Request Body: contains the users details
 *
 * Response codes:
 * 200 OK on successful authentication, responds with auth token
 * 401 UNAUTHORIZED if the user passes in an incorrect email or password
 * 500 INTERNAL SERVER ERROR for anything else
 */
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
      return
    }

    const authToken = Authentication.generateAuthToken(user)
    res.status(200).send({
      message: 'Authentication successful',
      authToken,
      username: user.username,
    })
  } catch (error) {
    res.status(500).send({ 'Error message': error.toString() })
  }
}

/**
 * Get a specific user activity by their username
 *
 * Requires Authentication
 *
 * Path parameter: username - the username of the user
 *
 * Response Codes:
 * 200 OK sends user info from username
 * 404 NOT FOUND if no user is found
 * 500 INTERNAL SERVER ERROR for everything else.
 */
export const getUserActivity = async (req, res) => {
  try {
    const { params } = req
    const decodedUser = res.locals.decodedUser
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

    let activities = await Activity.getUserActivities(
      userOfInterest.id,
      decodedUser.id
    )
    activities.sort((a, b) => {
      return a.timestamp < b.timestamp ? 1 : -1
    })

    res.status(200).send(activities)
  } catch (error) {
    res.status(500).send({ 'Error message': error.toString() })
  }
}

/**
 * Handles retrieving the feed of the logged in user
 *
 * Requires Authentication
 *
 * Path parameter: username - the username of the user
 *
 * Response code:
 * 200 OK with list of users feed
 * 500 INTERNAL SERVER ERROR for anything else
 */
export const getFeed = async (req, res) => {
  try {
    const loggedInUser = res.locals.decodedUser

    const following = await models.followers.findAll({
      where: {
        followerId: loggedInUser.id,
      },
    })

    const activities = await Activity.retrieveActivityFeed(
      following,
      loggedInUser.id
    )

    // Add in extra interests-based posts if not enough posts to send back
    let len = activities.length
    if (len < 10) {
      const interests = await Activity.retrieveInterests(loggedInUser.id)
      for (let i = 0; i < 10 - len && i < interests.length; i++) {
        activities.push(interests[i])
      }
    }

    res.status(200).send(activities)
  } catch (error) {
    res.status(500).send({ 'Error message': error.toString() })
  }
}

/**
 * Get notifications from current user
 *
 * Requires Authentication
 *
 * Response Codes:
 * 200 OK sends notifications
 * 500 INTERNAL SERVER ERROR for everything else.
 */
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

/**
 * Handles request for following a new user
 *
 * Requires Authentication
 *
 * Response Codes:
 * 200 OK sends notifications
 * 500 INTERNAL SERVER ERROR for everything else.
 */
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

/**
 * Unfollow a specific user by username
 *
 * Requires Authentication
 *
 * Path parameter: username - the username of the user
 *
 * Response Codes:
 * 200 OK when unfollows user
 * 404 NOT FOUND when user is not following user
 * 500 INTERNAL SERVER ERROR for everything else.
 */
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
 * Gets the list of followed users
 *
 * Require authentication
 * Path paramter: username - the username of the account to get info on
 *
 * Response Codes:
 * 200 OK when the followers and following has been successfully found.
 * 404 NOT FOUND when the post with that id can not be found.
 * 500 INTERNAL SERVER ERROR for everything else.
 */
export const getFollow = async (req, res) => {
  try {
    const { params } = req
    const user = await models.users.findOne({
      where: { username: params.username },
    })

    if (!user) {
      res.status(404).send({
        'Error message':
          'Invalid param : user with given username does not exist',
      })
      return
    }

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
      .then((followings) => followings.map((following) => following.followedId))

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
  } catch (error) {
    res.status(500).send({ 'Error message': error.toString() })
  }
}

/**
 * Require authentication
 * Request body: the modfied user data
 *
 * Response Codes:
 * 200 OK on update of user data.
 * 500 INTERNAL SERVER ERROR for failig to update or anything else.
 */
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

/**
 * Deletes a User
 * @Deprecated do not delete a user as it will break the database and other tables,
 * design flaw of original database/architecture
 *
 * Require authentication
 *
 * Response Codes:
 * 200 OK when the followers and following has been successfully found.
 * 500 INTERNAL SERVER ERROR for everything else.
 */
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
