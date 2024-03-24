import React, { useState, useEffect } from 'react';
import AnnouncementForm from '../AnnouncementsRoomPreviewSection/BuildingAnnouncement';

function RoomsDisplay({ buildingId }) {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`/api/buildings/announcements/fetchrooms?buildingId=${buildingId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRooms(data.rooms);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [buildingId]);

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  if (error) {
    return <div>Error fetching rooms: {error}</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {rooms.map((room) => (
          <div key={room.id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', cursor: 'pointer' }}
               onClick={() => setSelectedRoomId(room.id)}>
            <h3>{room.name}</h3>
          </div>
        ))}
      </div>
      {selectedRoomId && (
        <div>
          <h2>Post an Announcement to Room</h2>
          <AnnouncementForm roomId={selectedRoomId} />
          <button onClick={() => setSelectedRoomId(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default RoomsDisplay;

