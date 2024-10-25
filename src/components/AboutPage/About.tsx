import React, { FC } from 'react';

import '../../styles/common_styles.css';
import '../../styles/about_styles.css';


const About: FC = () => {
    return (
        <div className='about-content'>
            <p><b>DNS – один из лидеров рынка по продаже цифровой и бытовой техники в России.</b></p><br />
            <p>Наша цель изменить жизнь людей, сделав простым доступ к огромному количеству качественных и недорогих товаров, предоставляя лучший сервис.</p><br />
            <div className='about-content-grid'>
                <div className='about-grid-block'>
                    <p><img src="https://www.dns-shop.ru/about/assets/smile-ed772126.svg" alt="" /> <b>Для клиентов</b></p>
                    <p> Наши клиенты – в центре всего, что мы делаем,</p>
                    <p> Доверие - главное. Мы строим долгосрочные отношения,</p>
                    <p> Во всём, чем занимаемся, стремимся быть экспертами,</p>
                    <p> Открыты для предложений и улучшений.</p>
                </div>

                <div className='about-grid-block'>
                    <p><img src="https://www.dns-shop.ru/about/assets/case-ad3d35f8.svg" alt="" /> <b>Для партнёров</b></p>
                    <p> Прозрачность - основа совместного бизнеса,</p>
                    <p> Работаем, соблюдая этику бизнеса,</p>
                    <p> Уважаем другие мнения и интересы,</p>
                    <p> Выполняем обязательства и берем ответственность за свои решения,</p>
                    <p> Нетерпимы к коррупции.</p>
                </div>

                <div className='about-grid-block'>
                    <p><img src="https://www.dns-shop.ru/about/assets/stars-9d780f43.svg" alt="" /> <b>Для сотрудников</b></p>
                    <p> DNS - территория личной и коллективной самореализации,</p>
                    <p> Мы - одна команда,</p>
                    <p> Уважаем мнение и интересы людей,</p>
                    <p> Ценим свободу, смелость и ответственность.</p>
                </div>
            </div>
            <form className='about-feedback'>
                <h2>Обратная связь</h2>
                <label>Имя</label>
                <input maxLength={32} type="text" required />
                <label>Почта</label>
                <input type="email" />
                <label>Телефон</label>
                <input type="tel" />
                <label>Раздел</label>
                <select autoComplete='on' required>
                    <option>Товары</option>
                    <option>Заказ</option>
                    <option>Сервисный центр</option>
                    <option>Техническое сопровождение товара</option>
                    <option>Бонусы, подарочные карты, сертификаты</option>
                    <option>Коммерческое предложение</option>
                    <option>Трудоустройство в компании</option>
                    <option>Нарушение авторских или смежных прав</option>
                    <option>Другое</option>
                </select>
                <label>Вид сообщения</label>
                <p>&nbsp;<input name='topic' type="radio" required/>&nbsp;Отзыв</p>
                <p>&nbsp;<input name='topic' type="radio" required/>&nbsp;Рекламация или жалоба</p>
                <p>&nbsp;<input name='topic' type="radio" required/>&nbsp;Коммерческое предложение</p>
                <label>Поддержание связи</label>
                <p>&nbsp;<input type="checkbox" />&nbsp;Почта</p>
                <p>&nbsp;<input type="checkbox" />&nbsp;Телефон</p>
                <label>Текст сообщения</label>
                <textarea maxLength={1024} required></textarea>
                <button type='submit'>Отправить</button>
            </form>
        </div>
    );
};


export default About;