'use client';

import React, { useEffect, useState } from "react";

function BuildingAnnouncements({ buildingId }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function fetchAnnouncements() {
            try {
                const response = await fetch(`/api/announcements/buildings?buildingId=${buildingId}`);
                const data = await response.json();
                setMessages(data.rooms);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            }
        }

        fetchAnnouncements();
    }, [buildingId]);

    console.log(messages);

    return (
        <div>
            {messages.map((room) => ( 
                <div key={room.id}>
                    {room.announcements && room.announcements.map((announcement) => ( 
                        <div key={announcement.id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc" }}>
                            <div>
                                <strong>From:{announcement.sentBy.firstName}</strong> 
                            </div>
                            <div>
                                <strong>To:</strong> {announcement.sentToId ? room.name : "N/A"}
                            </div>
                            <div>{announcement.content}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );    
}

export default BuildingAnnouncements;