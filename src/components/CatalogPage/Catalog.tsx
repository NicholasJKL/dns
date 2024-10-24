import React, { FC, useState, useRef, ChangeEvent, MouseEvent } from 'react';

import CatalogElement from './CatalogElement';

import '../../styles/common_styles.css';
import '../../styles/catalog_styles.css';


const Catalog: FC = () => {

    const [isActive, setActive] = useState<boolean>(false);
    const search = useRef<HTMLFormElement>(null);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value) {
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
                <input type="search" placeholder='Поиск' onChange={handleInput} />
                <button type='reset' className={isActive ? 'catalog-clear-button' : 'catalog-clear-button hidden'} onClick={handleClear}></button>
                <button className='catalog-search-button'></button>
            </form>
            <div className='catalog-content'>
                <CatalogElement item_name='iPhone 6' item_price='19 999' image_path={process.env.PUBLIC_URL + 'img/iphone6-item.jpg'}></CatalogElement>
                <CatalogElement item_name='iPhone SE' item_price='14 999' image_path={process.env.PUBLIC_URL + 'img/iphoneSE-item.jpg'}></CatalogElement>
                <CatalogElement item_name='Intel i5-12400F ' item_price='28 999' image_path={process.env.PUBLIC_URL + 'img/intel-processor.jpg'}></CatalogElement>
                <CatalogElement item_name='AMD Ryzen 5 7500F' item_price='25 499' image_path={process.env.PUBLIC_URL + 'img/amd-processor.jpg'}></CatalogElement>
                <CatalogElement item_name='Dark Project Keyboard' item_price='11 099' image_path={process.env.PUBLIC_URL + 'img/darkproject-keyboard.jpg'}></CatalogElement>
                <CatalogElement item_name='HUAWEI Matebook' item_price='44 999' image_path={process.env.PUBLIC_URL + 'img/huawei-matebook.jpg'}></CatalogElement>
                <CatalogElement item_name='Xiaomi TV' item_price='27 999' image_path={process.env.PUBLIC_URL + 'img/xiaomi-tv.jpg'}></CatalogElement>
                <CatalogElement item_name='MSI RTX 4060' item_price='58 499' image_path={process.env.PUBLIC_URL + 'img/msi-graphiccard.jpg'}></CatalogElement>
            </div>
            <div className='catalog-pagination'>
                <button className='catalog-pagination-left'></button>
                <div className='catalog-pagination-current'><p>1</p></div>
                <button className='catalog-pagination-right'></button>
            </div>
        </div>
    );
};


export default Catalog;