import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: '',
    type: '',
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            const { message, type } = action.payload
            return {
                message,
                type,
            }
        },
    },
})

export const notificationWithTimeout = (message, type) => {
    return (dispatch) => {
        dispatch(setNotification(message, type))
        setTimeout(() => {
            dispatch(setNotification(initialState))
        }, 5000)
    }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
