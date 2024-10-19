import React, { FC } from 'react';

import '../../styles.css';

const About: FC = () => {
    return (
        <div className='about-content'>
            <p><b>DNS – один из лидеров рынка по продаже цифровой и бытовой техники в России</b></p><br />
            <p>Наша цель изменить жизнь людей, сделав простым доступ к огромному количеству качественных и недорогих товаров, предоставляя лучший сервис.</p><br />
            <div className='about-content-grid'>
                <div className='about-grid-block'>
                    <p><img src="https://www.dns-shop.ru/about/assets/smile-ed772126.svg" alt="" /> <b>Для клиентов</b></p>
                    <p>Наши клиенты – в центре всего, что мы делаем,
                        Доверие - главное. Мы строим долгосрочные отношения,
                        Во всём, чем занимаемся, стремимся быть экспертами,
                        Открыты для предложений и улучшений.</p>
                </div>

                <div className='about-grid-block'>
                    <p><img src="https://www.dns-shop.ru/about/assets/case-ad3d35f8.svg" alt="" /> <b>Для партнёров</b></p>
                    <p>Прозрачность - основа совместного бизнеса,
                        Работаем, соблюдая этику бизнеса,
                        Уважаем другие мнения и интересы,
                        Выполняем обязательства и берем ответственность за свои решения,
                        Нетерпимы к коррупции.</p>
                </div>

                <div className='about-grid-block'>
                    <p><img src="https://www.dns-shop.ru/about/assets/stars-9d780f43.svg" alt="" /> <b>Для сотрудников</b></p>
                    <p>DNS - территория личной и коллективной самореализации,
                        Мы - одна команда,
                        Уважаем мнение и интересы людей,
                        Ценим свободу, смелость и ответственность.</p>
                </div>
            </div>
        </div>
    );
};


export default About;