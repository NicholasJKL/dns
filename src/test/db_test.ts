import { Client, fql, FaunaError } from "fauna";
import User from "../models/User";

class UserExistError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserExistError';
    }
}

const client = new Client({
    secret: `fnAFuzZAwbAAyh_qRiZxFypuhT5B2m7y7WG-Z6PG`
});

const getUserDb = async (params: User): Promise<User> => {
    const query = fql`
    Users.firstWhere(user => user.user_email == ${params.user_email})`;
    const response = await client.query(query);
    
    if (response.data === null) {
        throw new Error(`Неправильная почта или неправильный пароль`);
    }
    if (response.data.user_password === params.user_password) {

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
            user_phone: "-"
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




export { getAllItemsDb, getItemByIdDb, getSearchingItemsDb, createUserDb };