import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = {
    user: null,
    username: '',
    password: '',
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        clearUser(state) {
            state.user = null
        },
        setUsername(state, action) {
            state.username = action.payload
        },
        setPassword(state, action) {
            state.password = action.payload
        },
        initializeUser(state, action) {
            const loggedUserJSON =
                window.localStorage.getItem('loggedBlogappUser')
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON)
                state.user = user
                // console.log('initializeUser :', user)
                blogService.setToken(user.token)
            }
        },
    },
})

export const { setUser, clearUser, setUsername, setPassword, initializeUser } =
    loginSlice.actions

export default loginSlice.reducer
