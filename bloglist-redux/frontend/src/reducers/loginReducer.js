// loginReducer.js
import { createSlice } from '@reduxjs/toolkit'

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
    },
})

export const { setUser, clearUser, setUsername, setPassword } =
    loginSlice.actions

export default loginSlice.reducer
