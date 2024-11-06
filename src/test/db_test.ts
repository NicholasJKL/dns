import { Client, fql, FaunaError } from "fauna";
import User from "../models/User";


const client = new Client({
    secret: 'fnAFuzZAwbAAyh_qRiZxFypuhT5B2m7y7WG-Z6PG'
});

const getAllItemsDb = async () => null;
const getItemByIdDb = async (params: { item_id: number | string }) => null;
const getSearchingItemsDb = async (params: { searchPrompt: string }) => null;
const createUserDb = async (params: User) => null;
const getUserDb = async (params: User) => {
    const query = fql`
    Users.firstWhere(user => user.user_email === ${params.user_email})`;
    const response = await client.query(query);
    if (response?.data.user_password === params.user_password) {
        return response.data;
    }
    else {
        return Error('Некорректно указана почта или неправильный пароль');
    }

}

export { getAllItemsDb, getItemByIdDb, getSearchingItemsDb, createUserDb, getUserDb };
