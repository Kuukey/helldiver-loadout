import React from 'react';
import FetchNews from '../components/FetchNews';

function Home() {
    return (
        <div>
            <h1> Welcome to My App</h1>
            <p>This is the home page of my React application</p>
            <p>here you can find some basic information and links to other parts of the site</p>
            <div>
                <h2>HELLDIVERS 2 NEWS</h2>
                <FetchNews />
            </div>
        </div>
    );
}

export default Home;