import React, { useEffect, useState } from 'react';

const ORDERS_CACHE_KEY = 'helldivers_orders';

function FetchOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Check if orders exist in the local storage
                const cachedOrders = localStorage.getItem(ORDERS_CACHE_KEY);
                if (cachedOrders) {
                    setOrders(JSON.parse(cachedOrders));
                    setLoading(false);
                } else {
                    const response = await fetch('https://api.helldivers2.dev/raw/api/v2/Assignment/War/801');
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setOrders(data);
                    // Store orders in local storage
                    localStorage.setItem(ORDERS_CACHE_KEY, JSON.stringify(data));
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const overrideTitle = orders.length > 0 ? orders[0].setting.overrideTitle : 'No order available';
    const taskType = orders.length > 0 ? orders[0].setting.tasks.map(task => task.type - 1) : [];
    const taskValue = orders.length > 0 ? orders[0].setting.tasks.map(task => task.values[taskType]) : [];

    return (
        <div>
            <h1 className="order-title">{overrideTitle}</h1>    
            {orders.map((order, index) => (
                <div key={index} className="order-div">
                    <p className="order-brief">{order.setting.overrideBrief}</p>
                    <p className="order-brief">{order.setting.taskDescription}</p>
                    <p className="order-task">{taskValue}</p>
                </div>
            ))}
        </div>
    );
}

export default FetchOrders;
