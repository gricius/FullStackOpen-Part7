// App.jsx
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Login from './components/Login' // Import the new Login component
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/loginReducer' // Ensure you have clearUser action

import { notificationWithTimeout } from './reducers/notificationReducer'

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.login.user)
    const blogFormRef = useRef()
    const notification = useSelector((state) => state.notification)

    useEffect(() => {
        dispatch(initializeBlogs())
        //console.log('dispatched initializeBlogs()', blogs)
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        } else {
            dispatch(clearUser())
        }
    }, [dispatch])

    const showNotification = (message, type) => {
        dispatch(notificationWithTimeout({ message, type }))
        console.log('notification type', type)
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        showNotification('Logged out', 'success')
        dispatch(clearUser())
    }

    console.log('Blogs in component:', blogs)

    return (
        <div>
            {user === null ? (
                <Login />
            ) : (
                <div>
                    <h2>blogs</h2>

                    {notification && (
                        <Notification notification={notification} />
                    )}

                    <p>
                        {user.name} logged in
                        <button onClick={handleLogout}>Logout</button>
                    </p>
                    <BlogForm user={user} blogFormRef={blogFormRef} />
                    {blogs && blogs.length > 0 ? (
                        [...blogs] // Create a copy of the blogs array
                            .sort((a, b) => b.likes - a.likes) // Now sort the copy
                            .map((blog) => (
                                <Blog key={blog.id} blog={blog} user={user} />
                            ))
                    ) : (
                        <p>Loading blogs...</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default App
