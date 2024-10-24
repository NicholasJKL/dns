import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import MainBrandElement from './MainBrandElement';

import '../../styles/common_styles.css';
import '../../styles/main_styles.css';

const Main: FC = () => {
    
    const navigation = useNavigate();

    const handleClick = () => {
        navigation('/catalog');
    }

    return (
        <div>
            <div className='main-content'>
                <div className='main-title'>
                    <h1>Интернет-магазин цифровой и бытовой техники.</h1>
                </div>
                <div className='main-content-grid'>
                    <div>
                        <h2>Наши партнёры:</h2>
                    </div>
                    <div>
                        <div className='main-brand-grid'>
                            <a href="https://vk.com/dexp_club?ysclid=m2nqew16iq986831609"><MainBrandElement image_path='https://c.dns-shop.ru/thumb/st1/fit/105/35/bad82a3c913879cf38b951d22e17ab37/f029627be01a67c5bf90e39587c84978426d8e73169f280c69077daf3f92f5b5.png'></MainBrandElement></a>
                            <a href="https://ardor-gaming.com/"><MainBrandElement image_path='https://c.dns-shop.ru/thumb/st1/fit/105/35/856ff976e32221f090e9aa7ac9e5ca7a/69e02179171d693c6982c3cddf1dd5d03b35e60c46ea8173923960042d9defe6.png'></MainBrandElement></a>
                            <a href="https://vk.com/reoka_org"><MainBrandElement image_path='https://c.dns-shop.ru/thumb/st1/fit/105/35/095a484bd538242520c4df18cc4af564/611cd9f48cf251af70de71548bf1b79f83a1eef613d78066a157914f0c3b19ac.png'></MainBrandElement></a>
                            <a href="https://www.apple.com/"><MainBrandElement image_path='https://c.dns-shop.ru/thumb/st1/fit/105/35/881ecfaffd9572056ce41a75248956c1/803a26bccbf00125dc8bf1c88135c3bb88da4f79225db7c37b21ac33dcc68aca.png'></MainBrandElement></a>
                            <a href="https://www.mi.com/ru/"><MainBrandElement image_path='https://c.dns-shop.ru/thumb/st1/fit/105/35/cf9e7fe8570e8be35e8e2386f87c71e8/9da1092afbcc0df7a313147ffba9b8ee3d38fd67676c716fee957e1389abc999.png'></MainBrandElement></a>
                            <a href="https://www.samsung.com/ru/"><MainBrandElement image_path='https://c.dns-shop.ru/thumb/st1/fit/105/35/c276aa4be62fb9dabd867bb7752a1e06/664957dcc564b0a1b3ee544e7a75059d36e89408e126663aeead7c665a483142.png'></MainBrandElement></a>
                            <a href="https://ru.msi.com/?ysclid=m2nqkopj4v578216002"><MainBrandElement image_path='https://c.dns-shop.ru/thumb/st1/fit/105/35/eb371b60e7dce3af539604856e951092/0302c89c8a023faa554cac112ac231b204b2d034af8e755200e3260d75ce7013.png'></MainBrandElement></a>
                            <a href="https://haieronline.ru/?utm_source=yandex&utm_medium=cpc&utm_campaign=brand_epk_tgo_search_rf_kbt_Haier&utm_content=Москва_213_search_107933565_5409936402_15894699100_50755806377_syn__50755806377_50755806377_premium_1&utm_term=техника%20haier&roistat=direct44_search_15894699100_техника%20haier&roistat_referrer=none&roistat_pos=premium_1&yclid=14758054640369008639"><MainBrandElement image_path='https://c.dns-shop.ru/thumb/st1/fit/105/35/02866639bfdb5b84ef685ca439678752/092a0d9328a52bd7b836888673980b604665f2ebec2234281649d8af5d006fcf.png'></MainBrandElement></a>
                            <a href="https://consumer.huawei.com/ru/"><MainBrandElement image_path='https://c.dns-shop.ru/thumb/st1/fit/105/35/e439c2143ca40ba1d44f93b7e1e9b855/20194aefa7610ba75f4615fa5982fab7e285c192a599a8d22807cfa3d8b8fc7d.png'></MainBrandElement></a>
                            <a href="https://asus-store.ru/"><MainBrandElement image_path='https://c.dns-shop.ru/thumb/st1/fit/105/35/38625d806b91aa26bfd220b00eabe464/763c04b78628f3c4268b6d226590cd01418bdbd1912a2f190b4fd7fe1b7d95e6.png'></MainBrandElement></a>
                            <a href="https://www.lg.com/ru"><MainBrandElement image_path='https://c.dns-shop.ru/thumb/st1/fit/105/35/cba2cdd2c27dca5adaca38df10f04bcb/9d7c2a60d92dae458ceabcda34651d11b3c63cf9bfa8eeacb8aeccf7ecf6e372.png'></MainBrandElement></a>
                            <p>и другие...</p>
                        </div>
                    </div>
                </div>
                <div className='main-go-purchasing'>
                    <button onClick={handleClick}>Перейти к каталогу товаров</button>
                </div>
            </div>
        </div>
    );
};


export default Main;