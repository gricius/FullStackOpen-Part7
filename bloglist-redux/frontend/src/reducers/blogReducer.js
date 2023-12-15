import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        addBlog(state, action) {
            return [...state, action.payload]
        },
        removeBlog(state, action) {
            return state.filter((b) => b.id !== action.payload)
        },
        setBlogs(state, action) {
            return state.concat(action.payload)
        },
        addLike(state, action) {
            const id = action.payload
            const blogToChange = state.find((b) => b.id === id)
            const changedBlog = {
                ...blogToChange,
                likes: blogToChange.likes + 1,
            }
            return state.map((blog) => (blog.id !== id ? blog : changedBlog))
        },
    },
})

export const initializeBlogs = () => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll()
            dispatch(setBlogs(blogs))
            console.log('Blogs initialized', blogs)
        } catch (error) {
            console.log('Error initializing blogs:', error.message)
        }
    }
}

export const createBlog = (blog) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().login.token
            const newBlog = await blogService.create(blog, token)
            dispatch(addBlog(newBlog))
            console.log('Blog created:', newBlog)
        } catch (error) {
            console.log('Error creating blog:', error.message)
        }
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        try {
            await blogService.deleteBlog(id)
            dispatch(removeBlog(id))
        } catch (error) {
            console.log('Error deleting blog:', error.message)
        }
    }
}

export const likeBlog = (id) => {
    return async (dispatch) => {
        try {
            const blogToLike = await blogService.updateLikes(id)
            dispatch(addLike(blogToLike.id))
        } catch (error) {
            console.log('Error liking blog:', error.message)
        }
    }
}

export const { addBlog, removeBlog, setBlogs, addLike } = blogSlice.actions

export default blogSlice.reducer
