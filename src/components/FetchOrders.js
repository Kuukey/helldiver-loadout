// src/components/FetchData.js
import React, { useEffect, useState } from 'react';

function FetchOrders() {
    const [messages, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        fetch('https://api.helldivers2.dev/raw/api/v2/Assignment/War/801')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    //Get major order title
    const overrideTitle = messages.length > 0 ? messages[0].setting.overrideTitle : 'No order available';

    //Get task type. Type corresponds to which Value to use
    const taskType = messages.length > 0 ? messages[0].setting.tasks.map(task => task.type - 1) : [];

    //Using task type, assign taskValue the correct vallue
    const taskValue = messages.length > 0 ? messages[0].setting.tasks.map(task => task.values[taskType]) : [];

    return (
        <div>
            <h1>{overrideTitle}</h1>    
            {messages.map((message, index) => (
                <div key={index}>
                    <p>{message.setting.overrideBrief}</p>
                    <p>{message.setting.taskDescription}</p>
                    <p>{taskValue}</p>
                </div>
            ))}
        </div>
    );
}

export default FetchOrders;
