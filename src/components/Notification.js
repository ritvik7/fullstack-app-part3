import React from 'react'

const Notification = ({notification}) => 
    <div className={notification.status}> 
        {notification.message} 
    </div>

export {Notification}