import models from '../../database/models'
import { Authentication } from '../../middlewares/authentication'
import { UserDTO } from '../../dto/users'
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

        // Retrieve user's posts, including the shared and liked posts

        const posts = await models.posts.findAll({
            where: {
                author: userOfInterest.id,
            },
        })

        const postsActivity = posts.map((p) =>
            Activity.convertToActivity(Activity.POSTED, p.id, p.createdAt)
        )

        const sharedPosts = await models.sharedPost.findAll({
            where: {
                userID: userOfInterest.id,
            },
        })

        const sharedPostsActivity = sharedPosts.map((p) =>
            Activity.convertToActivity(Activity.SHARED, p.postId, p.createdAt)
        )

        const likedPosts = await models.likedPost.findAll({
            where: {
                userID: userOfInterest.id,
            },
        })

        const likedPostsActivity = likedPosts.map((p) =>
            Activity.convertToActivity(Activity.LIKED, p.postId, p.createdAt)
        )

        // Merge the posts together into one array, sort them in descending order based on timestamp, and return them
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
        const authToken = req.get('Authorization')

        if (!authToken) {
            res.status(400).send({
                'Error message': 'Auth token not provided',
            })
            return
        }

        const decodedUser = Authentication.extractUser(authToken)
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
                .then((followers) =>
                    followers.map((follower) => follower.followerId)
                )
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
                followersUsers.map(async (user) => {
                    return await UserDTO.convertToDto(user)
                })
            )
            const followeringDTO = await Promise.all(
                followingUsers.map(async (user) => {
                    return await UserDTO.convertToDto(user)
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
