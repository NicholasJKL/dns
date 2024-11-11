import React, { FC, useState, MouseEvent } from 'react';

import '../../styles/common_styles.css';


interface CounterProps {
    value: number,
    valueKey: number | string,
    onChange: (valueKey: number | string, value: number) => void
}

const Counter: FC<CounterProps> = ({ value, valueKey, onChange }) => {

    const handleIncrement = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        value += 1;
        onChange(valueKey, value);
    }

    const handleDecrement = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        value -= 1;
        onChange(valueKey, value);
    }

    return (
        <div className='counter-block'>
            <button className='counter-button-left' onClick={handleDecrement}></button>
            <div className='counter-content'><p>{value}</p></div>
            <button className='counter-button-right' onClick={handleIncrement}></button>
        </div>
    );
};


export default Counter;


