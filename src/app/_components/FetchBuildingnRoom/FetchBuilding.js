"use client";

import React, { useState, useEffect } from 'react';
import RoomsDisplay from './FetchRoom';

function FetchBuildingsList() {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBuildingId, setSelectedBuildingId] = useState(null);

    useEffect(() => {
        fetch('/api/buildings') 
            .then(res => res.json())
            .then(data => {
                setBuildings(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleBuildingClick = (buildingId) => {
        <button onClick={() => setSelectedBuildingId(null)}>Back to Buildings</button>
        setSelectedBuildingId(buildingId);
    };

    if (selectedBuildingId) {
        return <RoomsDisplay buildingId={selectedBuildingId} />;
    }

    return (
        <div>
            {buildings.map((building) => (
                <div key={building.id} style={{ border: '2px solid red', margin: '10px', padding: '10px', cursor: 'pointer' }}
                     onClick={() => handleBuildingClick(building.id)}>
                    <p>{building.name}</p>
                    <p>{building.address}</p>
                </div>
            ))}
        </div>
    );
}

export default FetchBuildingsList;
