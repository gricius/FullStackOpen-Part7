import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        login: loginReducer,
    },
})

export default store
