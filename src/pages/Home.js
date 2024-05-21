import React from 'react';
import FetchNews from '../components/FetchNews';
import FetchOrders from '../components/FetchOrders';

function Home() {
    return (
        <div>
            <div>
                <FetchOrders />
                <FetchNews />
            </div>
        </div>
    );
}

export default Home;