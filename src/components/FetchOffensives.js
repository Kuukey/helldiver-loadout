import React, { useEffect, useState } from 'react';
import './FetchOffensives.css';

function FetchOffensives() {
    const [data, setData] = useState({
        weapons: [],
        secondaryWeapons: [],
        grenades: [],
        stratagems: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleDescriptions, setVisibleDescriptions] = useState({})

    useEffect(() => {
        // Fetch data from the API
        fetch(`${process.env.PUBLIC_URL}/data/offensive_equipment.json`)
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

    const toggleDescription = (id) => {
      setVisibleDescriptions(prevState => ({
        ...prevState,
        [id]: !prevState[id]
      }))
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    const pubURL = process.env.PUBLIC_URL;

    return (
        <div className="weapons-container">
            <h2>Primary Weapons</h2>
            <ul className="weapons-list">
                {/* Map over primary weapons data */}
                {data.weapons.map((weapon, index) => (
                  <li key={index} className="weapon-item">
                        <img src={`${pubURL}${weapon.imageUrl}`} alt={weapon.name} className="weapon-image" />
                        <div className="weapon-details">
                            <p>{weapon.name}</p>
                            <p>Damage: {weapon.stats.damage}</p>
                            <p>Capacity: {weapon.stats.capacity}</p>
                            <p>Fire Rate: {weapon.stats.fireRate}</p>
                            <p>Recoil: {weapon.stats.recoil}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <h2>Secondary Weapons</h2>
            <ul className="weapons-list">
                {/* Map over secondary weapons data */}
                {data.secondaryWeapons.map((weapon, index) => (
                  <li key={index} className="weapon-item">
                        <img src={`${pubURL}${weapon.imageUrl}`} alt={weapon.name} className="weapon-image"/>
                        <div className="weapon-details">
                            <p>{weapon.name}</p>
                            <p>Damage: {weapon.stats.damage}</p>
                            <p>Capacity: {weapon.stats.capacity}</p>
                            <p>Fire Rate: {weapon.stats.fireRate}</p>
                            <p>Recoil: {weapon.stats.recoil}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <h2>Grenades</h2>
            <ul className="weapons-list">
                {/* Map over grenades data */}
                {data.grenades.map((grenade, index) => (
                  <li key={index} className="weapon-item">
                        <img src={`${pubURL}${grenade.imageUrl}`} alt={grenade.name} className="weapon-image"/>
                        <div className="weapon-details">
                            <p>{grenade.name}</p>
                            <p>Damage: {grenade.stats.damage}</p>
                            <p>Blast Radius: {grenade.stats.blastRadius}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <h2>Stratagems</h2>
            <ul className="weapons-list">
                {/* Map over stratagems data */}
                {data.stratagems.map((stratagem, index) => (
                      <li key={index} className="weapon-item">
                        <img src={`${pubURL}${stratagem.imageUrl}`} alt={stratagem.name} className="weapon-image"/>
                        <div className="weapon-details">
                            <p>{stratagem.name}</p>
                            <button onClick={() => toggleDescription(stratagem.id)}>
                              {visibleDescriptions[stratagem.id] ? 'Hide Description' : 'Show Description'}
                            </button>
                            {visibleDescriptions[stratagem.id] && <p>{stratagem.description}</p>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FetchOffensives;
