import React, { FC } from 'react';


import '../../styles/common_styles.css';


interface NotificationProps {
    message: string
}

const Notification: FC<NotificationProps> = ({ message }) => {

    return (
        <div className='notification'>
            <p>{message}</p>
        </div>
    );
};


export default Notification;