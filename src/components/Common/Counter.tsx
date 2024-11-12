import React, { FC, useState, MouseEvent } from 'react';

import '../../styles/common_styles.css';


interface CounterProps {

}

const Counter: FC<CounterProps> = () => {

   
    return (
        <div className='counter-block'>
            <button className='counter-button-left'></button>
            <div className='counter-content'><p>1</p></div>
            <button className='counter-button-right'></button>
        </div>
    );
};


export default Counter;


