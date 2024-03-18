"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BuildingsList() {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/buildings') 
            .then(res => res.json())
            .then(data => {
                setBuildings(data);
                setLoading(false);
            });
    }, []);

    const handleBuildingClick = async (buildingId) => {
        // Navigate to the room creation page and pass the building ID as a query parameter
        const updateProfileResponse = await fetch('/api/buildings/updateprofile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ buildingId }),
        });
    
        if (updateProfileResponse.ok) {
            console.log("Profile updated with building selection");
        }
    
        router.push(`/app?buildingId=${buildingId}`);
    };

    if (loading) {
        return <p>Loading...</p>;
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