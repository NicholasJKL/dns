type Item = {
    item_id: string | number,
    item_name: string,
    item_price: number,
    item_description: string,
    item_props: Object
    image_path: string,
    item_cart_amount?: number
}

export default Item;