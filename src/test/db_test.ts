import { Client, fql, FaunaError } from "fauna";
import User from "../models/User";


const client = new Client({
    secret: `fnAFuzZAwbAAyh_qRiZxFypuhT5B2m7y7WG-Z6PG`
});

const getAllItemsDb = async () => null;
const getItemByIdDb = async (params: { item_id: number | string }) => null;
const getSearchingItemsDb = async (params: { searchPrompt: string }) => null;
const createUserDb = async (params: User) => null;
const getUserDb = async (params: User): Promise<User> => {
    const query = fql`
    Users.firstWhere(user => user.user_email == ${params.user_email})`;
    const response = await client.query(query);
    
    if (response.data === null) {
        throw new Error(`Неправильная почта или неправильный пароль`);
    }
    if (response.data.user_password === params.user_password) {
        return response.data;
    }
    throw new Error(`Ошибка авторизации`);
}

export { getAllItemsDb, getItemByIdDb, getSearchingItemsDb, createUserDb, getUserDb };
