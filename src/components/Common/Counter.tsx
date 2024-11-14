import React, { FC, useState, MouseEvent } from 'react';

import Item from '../../models/Item';

import '../../styles/common_styles.css';


interface CounterProps {
    item: Item,
    itemCartAmount: number | undefined,
    updateAmount: (item_id: number | string, value: number) => void,
    deleteItem: (rmItem: Item) => void
}

const Counter: FC<CounterProps> = ({ item, itemCartAmount, updateAmount, deleteItem }) => {

    const increment = (e: MouseEvent<HTMLButtonElement>) => {
        if (itemCartAmount) {
            return updateAmount(item.item_id, itemCartAmount + 1);
        }
    }

    const decrement = (e: MouseEvent<HTMLButtonElement>) => {
        if (itemCartAmount) {
            if (itemCartAmount - 1 < 1) {
                return deleteItem(item);
            }
            return updateAmount(item.item_id, itemCartAmount - 1);
        }

    }

    return (
        <div className='counter-block'>
            <button className='counter-button-left' onClick={decrement}></button>
            <div className='counter-content'><p>{itemCartAmount ?? 1}</p></div>
            <button className='counter-button-right' onClick={increment}></button>
        </div>
    );
};


export default Counter;


