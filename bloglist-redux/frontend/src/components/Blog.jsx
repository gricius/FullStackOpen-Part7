// ../components/Blog.jsx
import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { notificationWithTimeout } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'

const Blog = ({ blog, user, updateBlogs }) => {
    const dispatch = useDispatch()
    const [showDetails, setShowDetails] = useState(false)
    const [likes, setLikes] = useState(blog.likes)
    console.log('likes state:', likes)
    // const [notification, setNotification] = useState({
    //     message: null,
    //     type: null,
    // })
    const notification = useSelector((state) => state.notification)

    const showNotification = (message, type) => {
        dispatch(notificationWithTimeout({ message, type }))
    }

    const toggleDetails = () => {
        setShowDetails(!showDetails)
    }

    const handleLike = async () => {
        try {
            const updatedBlog = await blogService.updateLikes(blog.id, {
                ...blog,
                likes: likes + 1,
            })
            setLikes(updatedBlog.likes)
            showNotification('Blog liked', 'success')
            updateBlogs((prevBlogs) =>
                prevBlogs.map((b) =>
                    b.id === updatedBlog.id ? updatedBlog : b
                )
            )
            // console.log('handleLike function called')
            // console.log('Likes updated:', updatedBlog.likes)
        } catch (error) {
            console.error('Error updating likes:', error)
            showNotification('Error updating likes', 'error')
        }
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const handleDelete = async () => {
        const confirmRemove = window.confirm(
            `Remove blog ${blog.title} by ${blog.author}?`
        )
        if (confirmRemove) {
            try {
                await blogService.deleteBlog(blog.id)
                showNotification('Blog removed', 'success')
                updateBlogs((prevBlogs) =>
                    prevBlogs.filter((b) => b.id !== blog.id)
                )
            } catch (error) {
                console.error('Error removing blog:', error)
                showNotification('Error removing blog', 'error')
            }
        }
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
                        Likes: {likes}{' '}
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
