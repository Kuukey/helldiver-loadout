// src/components/FetchData.js
import React, { useEffect, useState } from 'react';

function FetchNews() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        fetch('https://api.helldivers2.dev/raw/api/NewsFeed/801')
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

    console.log(data)

    return (
        <div>
            <h1>Fetched Data</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.message}</li>
                ))}
            </ul>
        </div>
    );
}

export default FetchNews;
