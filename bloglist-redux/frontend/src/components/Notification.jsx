// ./components/Notification.js
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const { message, type } = useSelector((state) => state.notification)
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

    if (message === '') {
        return null
    }

    return (
        <div className="error" style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification
