import React, { FC, useEffect } from 'react';
import { Client, fql, FaunaError } from "fauna";


import '../styles/common_styles.css';


const Test: FC = () => {

    useEffect(() => {

        const testQuery = async () => {

            const client = new Client({
                secret: 'fnAFuzZAwbAAyh_qRiZxFypuhT5B2m7y7WG-Z6PG'
            });

            try {
                const query = fql`  
                Items.firstWhere(item => item.id == "412990063684616393")`;

                const response = await client.query(query);
                console.log(response.data);
                return {
                    statusCode: 200,
                    body: JSON.stringify(response.data),
                };

            } catch (error) {
                if (error instanceof FaunaError) {
                    console.log(error);
                }
            }
        }
        testQuery();


    }, []);

    return (
        <div></div>
    );
};


export default Test;