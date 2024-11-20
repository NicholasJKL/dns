import { getAllItemsDb, getItemByIdDb, getSearchingItemsDb, createUserDb, 
    getUserDb, getAllOrdersDb, createOrderDb, createFeedbackDb, updateUserDb } from './test/db_test'
import User from './models/User';
import Order from './models/Order';
import Feedback from './models/Feedback';

const getAllItems = async (): Promise<any> => {

    const url = `https://rococo-quokka-cd4373.netlify.app/.netlify/functions/DbGetAllItems`

    try {
        const response = await fetch(url);
        return await response.json();
    }

    catch {
        try {
            const queryObject = await getAllItemsDb();
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
            const queryObject = await getItemByIdDb({ item_id: item_id });
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
            const queryObject = await getSearchingItemsDb({ searchPrompt: searchPrompt });
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
            const queryObject = await createUserDb(user);
            return queryObject;
        }
        catch(error) {
            console.error(`Failed to create user`);
            throw(error);
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
            const queryObject = await getUserDb(user);
            return queryObject;
        }
        catch(error) {
            console.error(`Failed to get user`);
            throw error;
        }
    }
}

const getAllOrders = async (user: User) => {
    try {
        const queryObject = await getAllOrdersDb(user);
        return queryObject;
    }
    catch {
        console.error(`Failed to get orders`);
    }
}

const createOrder = async (order: Order, user: User) => {
    try {
        const queryObject = await createOrderDb(order, user);
        return queryObject;
    }
    catch {
        console.error(`Failed to create order`);
        throw new Error();
    }
}

const createFeedback = async (feedback: Feedback) => {
    try {
        const queryObject = await createFeedbackDb(feedback);
        return queryObject;
    }
    catch(error) {
        console.error(`Failed to create feedback`);
        throw error;
    }
}

const updateUser = async (user: User) => {
    try {
        const queryObject = await updateUserDb(user);
        return queryObject;
    }
    catch(error) {
        console.error(`Failed to update user`);
        throw error;
    }
}



export { getAllItems, getItemById, getSearchingItems, createUser, getUser, getAllOrders,
     createOrder, createFeedback, updateUser };
