import React from 'react';
import FetchNews from '../components/FetchNews';
import FetchOrders from '../components/FetchOrders';

function Home() {
    return (
        <div>
            <div>
                <h2>HELLDIVERS 2 NEWS</h2>
                <FetchNews />
                <FetchOrders />
            </div>
        </div>
    );
}

export default Home;