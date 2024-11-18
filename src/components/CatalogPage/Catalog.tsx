import React, { FC, useState, useRef, useEffect, ChangeEvent, MouseEvent, FormEvent } from 'react';
import { ToastContainer, toast, cssTransition, Zoom, Bounce } from 'react-toastify';

import CatalogElement from '../Common/ProductElement';
import Item from '../../models/Item';
import ItemDb from '../../models/ItemDb';

import { getAllItems, getSearchingItems } from '../../requests';

import '../../styles/common_styles.css';
import '../../styles/catalog_styles.css';
import 'react-toastify/dist/ReactToastify.css';


interface CatalogProps {
    addToCart: (newItem: Item) => void
}


const Catalog: FC<CatalogProps> = ({ addToCart }) => {

    const [items, setItems] = useState<Item[]>([]);
    const [isActive, setActive] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [searched, setSearched] = useState<string>('');
    const search = useRef<HTMLFormElement>(null);

    const setItemsFromQuery = (queryObject: { data: ItemDb[] }) => {
        const loadedItems: Item[] = queryObject.data.map((item: ItemDb) => (
            {
                item_id: item.id,
                item_name: item.item_name,
                item_price: item.item_price,
                image_path: item.image_path
            }
        )
        );
        setItems(loadedItems);
    }

    useEffect(() => {
        setItems([]);

        if (searched.length === 0) {
            getAllItems().then(queryObject => {
                if (queryObject !== undefined && queryObject !== null)
                    setItemsFromQuery(queryObject);
            });
        }
        else {
            getSearchingItems(searched.toLowerCase()).then(queryObject => {
                if (queryObject !== undefined && queryObject !== null)
                    setItemsFromQuery(queryObject);
            });
        }
        /* 
        setItems([
            { item_id: 0, item_name: 'iPhone 6', item_price: 19999, image_path: 'img/iphone6-item.jpg' },
            { item_id: 1, item_name: 'iPhone SE', item_price: 14999, image_path: 'img/iphoneSE-item.jpg' },
            { item_id: 2, item_name: 'Intel i5-12400F', item_price: 28999, image_path: 'img/intel-processor.jpg' },
            { item_id: 3, item_name: 'AMD Ryzen 5 7500F', item_price: 25499, image_path: 'img/amd-processor.jpg' },
            { item_id: 4, item_name: 'Dark Project Keyboard', item_price: 11099, image_path: 'img/darkproject-keyboard.jpg' },
            { item_id: 5, item_name: 'Huawei MateBook', item_price: 44999, image_path: 'img/huawei-matebook.jpg' },
            { item_id: 6, item_name: 'Xiaomi TV', item_price: 27999, image_path: 'img/xiaomi-tv.jpg' },
            { item_id: 7, item_name: 'MSI RTX 4060', item_price: 58499, image_path: 'img/msi-graphiccard.jpg' }]);
        */

    }, [searched]);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setSearchValue(value);

        if (value) {
            setActive(true);
        }
        else {
            setActive(false);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSearched(searchValue);

        if (searchValue.length === 0) {
            setIsSearching(false);
        }
        else {
            setIsSearching(true);
        }
    }

    const handleClear = (e: MouseEvent<HTMLElement>) => {
        search.current?.reset();
        setActive(false);
        setSearchValue('');
    }

    const notify = () => {
        toast.success("Товар добавлен в корзину", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
    }

    return (
        <div>
            <form className='catalog-search' onSubmit={handleSubmit} ref={search}>
                <input type="search" placeholder='Поиск' maxLength={64} onChange={handleInput} />
                <button type='reset' className={isActive ? 'catalog-clear-button' : 'catalog-clear-button hidden'} onClick={handleClear}></button>
                <button type='submit' className='catalog-search-button'></button>
            </form>

            {(isSearching) &&
                <div className='search-result'>
                    <p><b>Результаты поиска</b><br></br>
                        Вы искали: {searched}</p>
                </div>
            }
            <div className='catalog-content'>
                {items.map((item) => {
                    return (<CatalogElement key={item.item_id} item={item} type='catalog' onButtonClick={addToCart} notify={notify}></CatalogElement>)
                })}
            </div>
            <ToastContainer
               position="bottom-right"
               autoClose={5000}
               limit={5}
               hideProgressBar={false}
               newestOnTop
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="light"
               transition={Zoom}
            />

        </div>
    );
};


export default Catalog;