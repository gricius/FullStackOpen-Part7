import React from 'react'
import { useNotification } from '../NotificationContext'

const Notification = () => {
    const { state } = useNotification() 
    const { message, type } = state

    const notificationStyle = {
        color: type === 'success' ? 'green' : 'red',
        background: 'lightgrey',
        fontStyle: 'italic',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (message === null) {
        return null
    }

    return (
        <div className="error" style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification
