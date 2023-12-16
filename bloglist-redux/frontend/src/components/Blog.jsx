// ../components/Blog.jsx
import { useState } from 'react'
// import blogService from '../services/blogs'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { notificationWithTimeout } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user, updateBlogs }) => {
    const dispatch = useDispatch()
    const [showDetails, setShowDetails] = useState(false)
    const notification = useSelector((state) => state.notification)
    const blogs = useSelector((state) => state.blogs) // Assuming 'blogs' is the state slice name
    const blogDetails = blogs.find((b) => b.id === blog.id)

    const showNotification = (message, type) => {
        dispatch(notificationWithTimeout({ message, type }))
    }

    const toggleDetails = () => {
        setShowDetails(!showDetails)
    }

    const handleLike = () => {
        dispatch(likeBlog(blogDetails))
        showNotification('Blog liked', 'success')
    }

    const handleDelete = () => {
        const confirmRemove = window.confirm(
            `Remove blog ${blog.title} by ${blog.author}?`
        )
        if (confirmRemove) {
            dispatch(deleteBlog(blog.id))
            showNotification('Blog removed', 'success')
        }
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
        <div className="blog" style={blogStyle}>
            <div className="shortList">
                <div>Title: {blog.title}</div>
                <div>Author: {blog.author}</div>
                <button className="show-details-btn" onClick={toggleDetails}>
                    {showDetails ? 'Hide details' : 'Show details'}
                </button>
            </div>
            {/* <Notification notification={notification} /> */}
            {showDetails && (
                <div className="details">
                    <div>Blog URL: {blog.url}</div>
                    <div>
                        Likes: {blogDetails.likes}{' '}
                        <button className="like-button" onClick={handleLike}>
                            Like
                        </button>
                    </div>
                    {(user.id === blog.user.id || user.id === blog.user) && (
                        <button onClick={handleDelete}>Remove</button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Blog
