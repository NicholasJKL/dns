import Item from "./Item";


type Order = {
    id: number | string,
    user_id: number | string,
    items_id: any[],
    order_items?: Item[],
    items_amount: Map<number | string, number>,
    order_price: number,
    order_phone: string,
    order_address: string,
    order_status: string,
    order_created_at: Date
}

export default Order;