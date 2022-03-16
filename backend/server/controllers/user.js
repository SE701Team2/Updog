import models from '../../database/models'
import { Authentication } from '../../middlewares/authentication'
import { UserDTO } from '../../dto/users'
import {Activity} from "../../enums/activity";
import {Notifications} from "../../enums/notifications";
import { Activity } from '../../enums/activity'


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

        const authToken = req.get('Authorization')

        if (!authToken) {
            res.status(400).send({
                'Error message': 'Auth token not provided',
            })
        }

        const decodedUser = Authentication.extractUser(authToken)

        if (!decodedUser.id) {
            res.status(401).send({
                'Error message': 'Auth token invalid',
            })
        } else {
            const userDTO = await UserDTO.convertToDto(user)
            res.status(200).send(userDTO)
        }
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

        const unconvertedActivity = await Activity.getUnconvertedActivity(
            userOfInterest.id
        )

        const postsActivity = unconvertedActivity[0].map((p) =>
            Activity.convertToUserActivity(Activity.POSTED, p.id, p.createdAt)
        )
        const likedPostsActivity = unconvertedActivity[1].map((p) =>
            Activity.convertToUserActivity(
                Activity.LIKED,
                p.postId,
                p.createdAt
            )
        )
        const sharedPostsActivity = unconvertedActivity[2].map((p) =>
            Activity.convertToUserActivity(
                Activity.SHARED,
                p.postId,
                p.createdAt
            )
        )

        let activity = [
            ...postsActivity,
            ...sharedPostsActivity,
            ...likedPostsActivity,
        ]
        activity.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
        res.status(200).send(activity)
    } catch (error) {
        res.status(500).send({ 'Error message': error.toString() })
    }
}

export const getFeed = async (req, res) => {
    try {
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
      
        const following = await models.followers.findAll({
            where: {
                followerId: loggedInUser.id,
            },
        })

        let postsActivity = []
        let likedPostsActivity = []
        let sharedPostsActivity = []
        for (const user of following) {
            const unconvertedActivity = await Activity.getUnconvertedActivity(
                user.followedId
            )

            for (const activity of unconvertedActivity[0]) {
                const act = await Activity.convertToFeedActivity(
                    Activity.POSTED,
                    activity.id,
                    activity.author,
                    activity.createdAt
                )
                postsActivity.push(act)
            }
            for (const activity of unconvertedActivity[1]) {
                const act = await Activity.convertToFeedActivity(
                    Activity.LIKED,
                    activity.postId,
                    activity.userId,
                    activity.createdAt
                )
                likedPostsActivity.push(act)
            }

            for (const activity of unconvertedActivity[2]) {
                const act = await Activity.convertToFeedActivity(
                    Activity.SHARED,
                    activity.postId,
                    activity.userId,
                    activity.createdAt
                )
                sharedPostsActivity.push(act)
            }
        }

        let activity = [
            ...postsActivity,
            ...likedPostsActivity,
            ...sharedPostsActivity,
        ]
        activity.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
        res.status(200).send(activity)
    } catch (error) {
        res.status(500).send({ 'Error message': error.toString() })
    }
}

export const getNotifications = async (req, res) => {
    try {
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

       const notifications = await Notifications.retrieveNotifications(loggedInUser.id);
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

        const authToken = req.get('Authorization')

        if (!authToken) {
            res.status(400).send({
                'Error message': 'Auth token not provided',
            })
            return
        }

        const decodedUser = Authentication.extractUser(authToken)

        if (!decodedUser.id) {
            res.status(401).send({
                'Error message': 'Auth token invalid',
            })
            return
        }

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

        const authToken = req.get('Authorization')

        if (!authToken) {
            res.status(400).send({
                'Error message': 'Auth token not provided',
            })
            return
        }

        const decodedUser = Authentication.extractUser(authToken)

        if (!decodedUser.id) {
            res.status(401).send({
                'Error message': 'Auth token invalid',
            })
            return
        }

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
