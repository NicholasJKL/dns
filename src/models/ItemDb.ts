interface ItemDb {
    id: string | number,
    coll: Object,
    item_name: string,
    item_price: string,
    image_path: string,
    ts: Date
}

export default ItemDb;