// App.jsx
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import {
    useNotification,
    setNotification,
} from './contexts/NotificationContext'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const blogFormRef = useRef()
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const { dispatch } = useNotification()

    useEffect(() => {
        blogService.getAll().then((blogs) => {
            setBlogs(blogs)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        console.log('loggedUserJSON', loggedUserJSON)
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            console.log('user', user)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then((returnedBlog) => {
                setBlogs(blogs.concat(returnedBlog))
                setNewTitle('')
                setNewAuthor('')
                setNewUrl('')
                setNotification(dispatch, 'Blog added', 'success')
                //console.log(returnedBlog)
            })
            .catch((exception) => {
                setNotification(
                    dispatch,
                    'Error: All fields are mandatory. Please retry',
                    'error'
                )
            })
    }

    const blogForm = () => (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
        </Togglable>
    )

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setNotification(dispatch, 'Logged out', 'success')
        setUser(null)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setNotification(dispatch, 'Logged in', 'success')
        } catch (exception) {
            setNotification(dispatch, 'Wrong credentials', 'error')
            console.log('wrong credentials', exception)
        }
    }

    const updateBlogs = (updatedBlogs) => {
        setBlogs(updatedBlogs)
    }

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification />
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            className="username"
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            className="password"
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button className="login-button" type="submit">
                        Log in
                    </button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <p>
                {user.name} logged in
                <button onClick={handleLogout}>Logout</button>
            </p>
            {blogForm()}
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        url={blog.url}
                        user={user}
                        updateBlogs={updateBlogs}
                    />
                ))}
        </div>
    )
}

export default App
