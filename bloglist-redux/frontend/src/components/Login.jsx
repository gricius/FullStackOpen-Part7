// Login.jsx
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setUsername, setPassword } from '../reducers/loginReducer'
import loginService from '../services/login'

const Login = () => {
    const dispatch = useDispatch()
    const username = useSelector((state) => state.login.username)
    const password = useSelector((state) => state.login.password)

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            dispatch(setUser(user))
            dispatch(setUsername(''))
            dispatch(setPassword(''))
        } catch (exception) {
            console.log('exception', exception)
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) =>
                            dispatch(setUsername(target.value))
                        }
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) =>
                            dispatch(setPassword(target.value))
                        }
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login
