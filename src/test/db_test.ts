import { Client, fql, FaunaError } from "fauna";

import User from "../models/User";
import Order from "../models/Order";

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
            console.log(responseSameUser.data)
            throw (new UserExistError('Пользователь с такой почтой уже существует'));
        }

        const query = fql`  
        Users.create({
            user_email: ${user.user_email},
            user_password: ${user.user_password},
            user_name: "-",
            user_phone: "-",
            user_address: "-"
        })`;
        const response = await client.query(query);
        console.log(response.data);
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
        Orders.where(order => order.user_id == ${params.user_id})`;
    const response = await client.query(query);
    return response.data;
}

const createOrderDb = async (params: Order): Promise<any> => {
    try {
        const query = fql`
    Orders.create({
        user_id: Users.firstWhere(user => user.id == ${params.user_id}),
        items_id: [${params.items_id.toString()}].map(item_id=>Items.firstWhere(item => item.id == item_id)),
        items_amount: ${Object.fromEntries(params.items_amount)},
        order_price: ${params.order_price},
        order_phone: ${params.order_phone},
        order_address: ${params.order_address},
        order_status: ${params.order_status},
        order_created_at: ${params.order_created_at.toString()}
        
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




export { getAllItemsDb, getItemByIdDb, getSearchingItemsDb, createUserDb, getUserDb, getAllOrdersDb, createOrderDb };