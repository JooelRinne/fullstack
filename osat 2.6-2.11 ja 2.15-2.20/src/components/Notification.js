import React from 'react'

const Notification = ({ className, message }) => {
    if (message === null) {
        return null
    }

    if (className === "ok") {
    return (
        <div className="ok">
            {message}
        </div>
    )
    }

    if (className === "error") {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
}

export default Notification