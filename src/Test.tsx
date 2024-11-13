import React, { useState, useEffect } from 'react';

function Test() {
    const [myArray, setMyArray] = useState<any[]>([]);

    useEffect(() => {
        const storedArray = localStorage.getItem('myArray');
        if (storedArray) {
            setMyArray(JSON.parse(storedArray));
        }
    }, []);

    const handleAddItem = (newItem: any) => {
        setMyArray([...myArray, newItem]);
        localStorage.setItem('myArray', JSON.stringify([...myArray, newItem]));

    };

    return (
        <div>
            <h1>Мой массив:</h1>
            <ul>
                {myArray.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button onClick={() => handleAddItem('Новый элемент')}>Добавить элемент</button>
        </div>
    );
}

export default Test;