interface ItemDb {
    id: string | number,
    coll: Object,
    item_name: string,
    item_price: number,
    item_description: string,
    item_props: Object,
    image_path: string,
    ts: Date
}

export default ItemDb;