import models from '../../database/models'

export const createPost = async (req, res) => {
    res.status(200).send('Creating a new post!')
}

export const getPostById = async (req, res) => {
    try {
        const { params } = req
        const post = await models.posts.findByPk(params.id)
        res.status(200).send(post)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const modifyPostById = async (req, res) => {
    res.status(200).send('Modifying the post!')
}

export const deletePostById = async (req, res) => {
    res.status(200).send('Deleting the post!')
}
