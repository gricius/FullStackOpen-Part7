import React, { createContext, useContext, useReducer } from 'react'

const initialState = {
    message: null,
    type: null,
}

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {
                message: action.message,
                type: action.notificationType,
            }
        case 'CLEAR_NOTIFICATION':
            return initialState
        default:
            return state
    }
}

const NotificationContext = createContext()

export const setNotification = (dispatch, message, type) => {
    dispatch({ type: 'SET_NOTIFICATION', message, notificationType: type })
    setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
}

export const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, initialState)

    return (
        <NotificationContext.Provider
            value={{ state, dispatch, setNotification }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (context === undefined) {
        throw new Error(
            'useNotification must be used within a NotificationProvider'
        )
    }
    return context
}
