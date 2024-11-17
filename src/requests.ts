import { getAllItemsDb, getItemByIdDb, getSearchingItemsDb, createUserDb, getUserDb, getAllOrdersDb, createOrderDb, createFeedbackDb } from './test/db_test'
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
            const queryObject = await getUserDb(user);
            return queryObject;
        }
        catch {
            console.error(`Failed to get user`);
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

const createOrder = async (order: Order) => {
    try {
        const queryObject = await createOrderDb(order);
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
    catch {
        console.error(`Failed to create feedback`);
        throw new Error();
    }
}



export { getAllItems, getItemById, getSearchingItems, createUser, getUser, getAllOrders, createOrder, createFeedback };
