import React, { FC } from 'react';


import '../../styles/common_styles.css';
import '../../styles/contacts_styles.css';

const Contacts: FC = () => {
    return (
        <div className='contacts-content'>
            <h1><u>2614</u> магазинов по всему миру!</h1>
            <div>
                <iframe title='dns-map' src="https://yandex.ru/map-widget/v1/?display-text=DNS&ll=37.707261%2C55.726768&mode=search&sll=37.617700%2C55.755863&sspn=1.444702%2C0.499508&text=%7B%22text%22%3A%22DNS%22%2C%22what%22%3A%5B%7B%22attr_name%22%3A%22chain_id%22%2C%22attr_values%22%3A%5B%221996262835%22%5D%7D%5D%7D&z=11" width="900" height="600"></iframe>
            </div>
            <p>Оставайтесь на связи:<br></br>8-800-77-07-999 (c 03:00 до 22:00)</p>
        </div>
    );
};


export default Contacts;