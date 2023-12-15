// ../components/BlogForm.jsx
//import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notificationWithTimeout } from '../reducers/notificationReducer'
import Togglable from './Togglable'

const BlogForm = ({ user, blogFormRef }) => {
    const dispatch = useDispatch()

    const showNotification = (message, type) => {
        dispatch(notificationWithTimeout({ message, type }))
        console.log('notification type', type)
    }

    const creteNewBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value,
        }
        console.log('newBlog and user', newBlog, user)

        try {
            dispatch(createBlog({ ...newBlog, user }))
            showNotification('Blog added by ' + user, 'success')
            event.target.title.value = ''
            event.target.author.value = ''
            event.target.url.value = ''
            //blogFormRef.current.toggleVisibility()
        } catch (exception) {
            showNotification('Blog could not be added', 'error')
            console.log(exception)
        }
    }

    return (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <div>
                <h2>Create new</h2>
                <form onSubmit={creteNewBlog}>
                    <div>
                        Title:
                        <input id="title" name="title" />
                    </div>
                    <div>
                        Author: <input id="author" name="author" />
                    </div>
                    <div>
                        Url: <input id="url" name="url" />
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
        </Togglable>
    )
}

export default BlogForm
