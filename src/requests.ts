import { getAllItemsDb, getItemByIdDb, getSearchingItemsDb, createUserDb, getUserDb } from './test/db_test'
import User from './models/User';

const getAllItems = async (): Promise<any> => {

    const url = `https://rococo-quokka-cd4373.netlify.app/.netlify/functions/DbGetAllItems`

    try {
        const response = await fetch(url);
        return await response.json();
    }

    catch {
        try {
            const queryObject = getAllItemsDb();
            return queryObject;
        }
        catch {
            console.error('Failed to load data');
        }
    }
}

const getItemById = async (item_id: string | number) => {
    const url = `https://rococo-quokka-cd4373.netlify.app/.netlify/functions/DbGetItemById?item_id=${item_id}`

    try {
        const response = await fetch(url);
        return await response.json();
    }
    catch {
        try {
            const queryObject = getItemByIdDb({ item_id: item_id });
            return queryObject;
        }
        catch {
            console.error(`Failed to load data`);
        }
    }
}

const getSearchingItems = async (searchPrompt: string) => {
    const url = `https://rococo-quokka-cd4373.netlify.app/.netlify/functions/DbGetItemById?searchPrompt=${searchPrompt}`

    try {
        const response = await fetch(url);
        return await response.json();
    }
    catch {
        try {
            const queryObject = getSearchingItemsDb({ searchPrompt: searchPrompt });
            return queryObject;
        }
        catch {
            console.error(`Failed to load data`);
        }
    }
}

const createUser = async (user: User) => {
    const url = `---`

    try {
        const response = await fetch(url);
        return await response.json();
    }
    catch {
        try {
            const queryObject = createUserDb(user);
            return queryObject;
        }
        catch {
            console.error(`Failed to create user`);
        }
    }
}

const getUser = async (user: User) => {
    const url = `---`

    try {
        const response = await fetch(url);
        return await response.json();
    }
    catch {
        try {
            const queryObject = getUserDb(user);
            return queryObject;
        }
        catch {
            console.error(`Failed to get user`);
        }
    }
}



export { getAllItems, getItemById, getSearchingItems, createUser, getUser };
