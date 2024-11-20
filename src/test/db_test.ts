import { Client, fql, FaunaError } from "fauna";

import User from "../models/User";
import Order from "../models/Order";
import Feedback from "../models/Feedback";

class UserExistError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserExistError';
    }
}

const client = new Client({
    secret: `fnAFuzZAwbAAyh_qRiZxFypuhT5B2m7y7WG-Z6PG`
});

const getAllItemsDb = async (): Promise<any> => {
    try {
        const query = fql`  
        Items.all()`;
        const response = await client.query(query);
        console.log(response.data)
        return response.data;

    } catch (error) {
        if (error instanceof FaunaError) {
            console.log(error);
        }
    }
}

const getItemByIdDb = async (params: any): Promise<any> => {
    try {
        const query = fql`  
            Items.firstWhere(item => item.id == ${params.item_id})`;
        const response = await client.query(query);
        return response.data;
    }
    catch (error) {
        if (error instanceof FaunaError) {
            console.log(error);
        }
    }
}

const getSearchingItemsDb = async (params: any): Promise<any> => {
    try {
        const query = fql`  
        Items.where(.item_name.toLowerCase().includes(${params.searchPrompt}))`;
        const response = await client.query(query);
        return response.data;
    }
    catch (error) {
        if (error instanceof FaunaError) {
            console.log(error);
        }
    }
}

const createUserDb = async (user: User): Promise<any> => {
    try {

        const sameUser = fql`
        Users.firstWhere(user => user.user_email == ${user.user_email})`
        const responseSameUser = await client.query(sameUser);

        if (responseSameUser.data !== null) {
            throw (new UserExistError('Регистрация не завершена. Пользователь с такой почтой уже существует'));
        }

        const query = fql`  
        Users.create({
            user_email: ${user.user_email},
            user_password: ${user.user_password},
            user_name: "",
            user_phone: "",
            user_address: ""
        })`;
        const response = await client.query(query);
        return response.data;
    }
    catch (error) {
        if (error instanceof FaunaError) {
            console.log(error);
        }
        if (error instanceof UserExistError) {
            throw error;
        }
    }
}

const getUserDb = async (params: { user_email: string, user_password: string }): Promise<User> => {

    const query = fql`
    Users.firstWhere(user => user.user_email == ${params.user_email})`;
    const response = await client.query(query);

    if (response.data === null) {
        throw new Error(`Неправильная почта или неправильный пароль`);
    }

    else if (response.data.user_password === params.user_password) {
        return response.data;
    }

    throw new Error(`Ошибка авторизации`);
}

const getAllOrdersDb = async (params: { user_id: number | string }): Promise<any> => {
    const query = fql`
        Orders.where(order => order.user_id.id == ${params.user_id})`;
    const response = await client.query(query);
    return response.data;
}

const createOrderDb = async (order: Order, user: User): Promise<any> => {
    try {
        const checkUserQuery = fql`Users.firstWhere(user => user.id == ${order.user_id})`;
        const responseCheckUser = await client.query(checkUserQuery);

        if(!(responseCheckUser.data.user_password === user.user_password)){
            throw new Error('Ошибка авторизации');
        }
        console.log(responseCheckUser.data.id)
        const query = fql`
    Orders.create({
        user_id: ${responseCheckUser.data},
        items_id: ${order.items_id.toString()}.split(',').map(item_id => Items.firstWhere(item => item.id == item_id)),
        items_amount: ${Object.fromEntries(order.items_amount)},
        order_price: ${order.order_price},
        order_phone: ${order.order_phone},
        order_address: ${order.order_address},
        order_status: ${order.order_status},
        order_created_at: ${order.order_created_at.getDate().toString()}+"."+${order.order_created_at.getMonth().toString()}+
        "."+${order.order_created_at.getFullYear().toString()}+" "+${order.order_created_at.getHours().toString()}+
        ":"+${order.order_created_at.getMinutes().toString()}+":"+${order.order_created_at.getSeconds().toString()}    
        })`
        const response = await client.query(query);

        return response.data
    }
    catch (error) {
        if (error instanceof FaunaError) {
            console.error(error);
        }
        throw new Error();
    }
}

const createFeedbackDb = async (feedback: Feedback): Promise<any> => {
    try {
        const query = fql`
        Feedback.create({
        user_id: ${feedback.user_id},
        user_name: ${feedback.user_name},
        user_email: ${feedback.user_email},
        user_phone: ${feedback.user_phone},
        section: ${feedback.section},
        type: ${feedback.type},
        keep_in_touch: ${feedback.keep_in_touch},
        text: ${feedback.text}
        })`
        const response = await client.query(query);
        return response.data
    }
    catch (error) {
        if (error instanceof FaunaError) {
            console.error(error);
        }
        throw new Error();
    }
}

const updateUserDb = async (user: User): Promise<any> => {
    try {
        const query = fql`
        Users.firstWhere(user => user.user_email == ${user.user_email})?.update({
        user_name: ${user.user_name},
        user_phone: ${user.user_phone},
        user_address: ${user.user_address}
        })`
        const response = await client.query(query);
        return response.data
    }
    catch (error) {
        if (error instanceof FaunaError) {
            console.error(error);
        }
        throw new Error();
    }
}




export { getAllItemsDb, getItemByIdDb, getSearchingItemsDb, createUserDb, 
    getUserDb, getAllOrdersDb, createOrderDb, createFeedbackDb, updateUserDb };