import React, { FC } from 'react';

import '../../styles/common_styles.css';

const Footer: FC = () => {
    return (
        <footer>
            <p>© 2024 Макет сайта DNS. </p>
            <a href='/privacy_policy.pdf' target="_blank" className='link link-active'>Политика конфиденциальности</a>
        </footer>
    );
};


export default Footer;