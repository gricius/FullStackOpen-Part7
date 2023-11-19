const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const { user } = request
    const body = request.body

    if (!user) {
        return response.status(401).json({ error: 'User not found' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id,
    })

    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    } catch (error) {
        response.status(400).json({ error: 'Invalid data' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const { user } = request
    const { id } = request.params

    if (!user) {
        return response.status(401).json({ error: 'User not found' })
    }

    try {
        const blog = await Blog.findById(id)

        if (!blog) {
            return response.status(404).json({ error: 'Blog not found' })
        }

        if (blog.user.toString() !== user._id.toString()) {
            return response.status(403).json({ error: 'Permission denied' })
        }

        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    } catch (error) {
        console.log(error)
        return response.status(500).json({ error: 'Internal server error' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const { user } = request
    const { id } = request.params
    const { likes } = request.body
    // console.log(request.body)

    if (!user) {
        return response.status(401).json({ error: 'User not found' })
    }


    try {
        const blog = await Blog.findById(id)

        if (!blog) {
            return response.status(404).json({ error: 'Blog not found' })
        }
        blog.likes = likes
        const updatedBlog = await blog.save()
        response.json(updatedBlog)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ error: 'Internal server error' })
    }
}
)

module.exports = blogsRouter