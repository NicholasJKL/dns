import { getAllItemsFromDb, getItemByIdFromDb, getSearchingItemsFromDb } from './test/db_test'

const getAllItems = async (): Promise<any> => {

    const url = `https://rococo-quokka-cd4373.netlify.app/.netlify/functions/DbGetAllItems`

    try {
        const response = await fetch(url);
        return await response.json();
    }

    catch {
        try {
            const queryObject = getAllItemsFromDb();
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
            const queryObject = getItemByIdFromDb({ item_id: item_id });
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
            const queryObject = getSearchingItemsFromDb({ searchPrompt: searchPrompt});
            return queryObject;
        }
        catch {
            console.error(`Failed to load data`);
        }
    }
}

export { getAllItems, getItemById, getSearchingItems };
