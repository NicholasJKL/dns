import React, { FC, useState, useRef, ChangeEvent, MouseEvent, useEffect } from 'react';

import CatalogElement from './CatalogElement';
import Item from '../../models/Item';

import '../../styles/common_styles.css';
import '../../styles/catalog_styles.css';


const Catalog: FC = () => {

    const [isActive, setActive] = useState<boolean>(false);
    const [items, setItems] = useState<Item[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const search = useRef<HTMLFormElement>(null);

    useEffect(() => {
        setItems([
            { item_name: 'iPhone 6', item_price: '19 999', image_path: 'img/iphone6-item.jpg' },
            { item_name: 'iPhone SE', item_price: '14 999', image_path: 'img/iphoneSE-item.jpg' },
            { item_name: 'Intel i5-12400F', item_price: '28 999', image_path: 'img/intel-processor.jpg' },
            { item_name: 'AMD Ryzen 5 7500F', item_price: '25 499', image_path: 'img/amd-processor.jpg' },
            { item_name: 'Dark Project Keyboard', item_price: '11 099', image_path: 'img/darkproject-keyboard.jpg' },
            { item_name: 'Huawei MateBook', item_price: '44 999', image_path: 'img/huawei-matebook.jpg' },
            { item_name: 'Xiaomi TV', item_price: '27 999', image_path: 'img/xiaomi-tv.jpg' },
            { item_name: 'MSI RTX 4060', item_price: '58 499', image_path: 'img/msi-graphiccard.jpg' }]);

    }, []);


    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value) {
            setSearchValue(value);
            setActive(true);
        }
        else {
            setActive(false);
        }
    }

    const handleClear = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        search.current?.reset();
        setActive(false);
    }

    return (
        <div>
            <form className='catalog-search' ref={search}>
                <input type="search" placeholder='Поиск' maxLength={64} onChange={handleInput} />
                <button type='reset' className={isActive ? 'catalog-clear-button' : 'catalog-clear-button hidden'} onClick={handleClear}></button>
                <button className='catalog-search-button'></button>
            </form>

            {(isActive) ?
                <div className='search-result'>
                    <p><b>Результаты поиска</b><br></br>
                        Вы искали: {searchValue}</p>
                </div>
                :
                <div className='catalog-content'>
                    {items.map((item) => {
                        return (<CatalogElement item_name={item.item_name} item_price={item.item_price} image_path={item.image_path}></CatalogElement>)
                    })}
                </div>
            }
            <div className='catalog-pagination'>
                <button className='catalog-pagination-left'></button>
                <div className='catalog-pagination-current'><p>1</p></div>
                <button className='catalog-pagination-right'></button>
            </div>
        </div>
    );
};


export default Catalog;