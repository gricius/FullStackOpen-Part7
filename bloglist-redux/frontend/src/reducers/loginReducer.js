import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUser(state, action) {
            return {
                user: action.payload,
            }
        },
        clearUser(state) {
            return {
                user: null,
            }
        },
    },
})

export const { setUser, clearUser } = loginSlice.actions
export default loginSlice.reducer
