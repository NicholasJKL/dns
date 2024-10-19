import React, { FC } from 'react';

import CatalogElement from './CatalogElement';

import '../../styles.css';

const Catalog: FC = () => {
    return (
        <div className='catalog-content'>
            <CatalogElement></CatalogElement>

        </div>
    );
};


export default Catalog;