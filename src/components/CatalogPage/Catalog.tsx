import React, { FC, useState, useRef, ChangeEvent, MouseEvent, RefObject } from 'react';

import CatalogElement from './CatalogElement';

import '../../styles.css';

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
                <CatalogElement></CatalogElement>
                <CatalogElement></CatalogElement>
                <CatalogElement></CatalogElement>
                <CatalogElement></CatalogElement>
                <CatalogElement></CatalogElement>
                <CatalogElement></CatalogElement>
            </div>
        </div>
    );
};


export default Catalog;