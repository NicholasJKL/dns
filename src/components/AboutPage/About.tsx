import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { createFeedback } from '../../requests';

import Feedback from '../../models/Feedback';
import User from '../../models/User';

import '../../styles/common_styles.css';
import '../../styles/about_styles.css';


interface AboutProps {
    user: User,
    notify: (message: string, type: string) => void
}

const About: FC<AboutProps> = ({ user, notify }) => {

    const initFeedback: Feedback = {
        user_id: user.user_id,
        user_name: user.user_name,
        user_email: user.user_email,
        user_phone: user.user_phone,
        section: 'Товары',
        type: '',
        keep_in_touch: {},
        text: ''
    }

    const [feedback, setFeedback] = useState<Feedback>(initFeedback);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setFeedback({
            ...feedback,
            [name]: value
        });
    }

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;

        setFeedback({
            ...feedback,
            [name]: value
        });
    }

    const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.currentTarget;

        setFeedback({
            ...feedback,
            keep_in_touch: {
                ...feedback.keep_in_touch,
                [name]: checked
            }
        });
    }

    const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;

        setFeedback({
            ...feedback,
            [name]: value
        });

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.currentTarget.reset();
        
        createFeedback(feedback)
            .then(() => notify('Сообщение отправлено.','success'))
            .catch(() => notify('Ошибка при отправке отзыва. Попробуйте отправить отзыв позже.','error'));
    }

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
            <form className='about-feedback' action='submit' onSubmit={handleSubmit}>
                <h2>Обратная связь</h2>
                <label>Имя</label>
                <input name='user_name' maxLength={32} type="text" onChange={handleChangeInput} 
                defaultValue={user.user_name} required />
                <label>Почта</label>
                <input name='user_email' type="email" onChange={handleChangeInput} defaultValue={user.user_email} />
                <label>Телефон</label>
                <input name='user_phone' type="tel" onChange={handleChangeInput} defaultValue={user.user_phone} />
                <label>Раздел</label>
                <select name='section' autoComplete='on' onChange={handleChangeSelect} required>
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
                <p>&nbsp;<input name='type' type="radio" value='Отзыв' onChange={handleChangeInput} required />&nbsp;Отзыв</p>
                <p>&nbsp;<input name='type' type="radio" value='Рекламация или жалоба' onChange={handleChangeInput} required />&nbsp;Рекламация или жалоба</p>
                <p>&nbsp;<input name='type' type="radio" value='Коммерческое предложение' onChange={handleChangeInput} required />&nbsp;Коммерческое предложение</p>
                <label>Поддержание связи</label>
                <p>&nbsp;<input name='email' type="checkbox" onChange={handleChangeCheckbox} />&nbsp;Почта</p>
                <p>&nbsp;<input name='phone' type="checkbox" onChange={handleChangeCheckbox} />&nbsp;Телефон</p>
                <label>Текст сообщения</label>
                <textarea name='text' maxLength={1024} onChange={handleChangeText} required></textarea>
                <button type='submit'>Отправить</button>
            </form>
        </div>
    );
};


export default About;