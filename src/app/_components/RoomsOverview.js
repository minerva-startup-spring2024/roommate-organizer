"use client";

import RoomPreview from "./RoomPreview/RoomPreview";

export default function RoomsOverview({ rooms }) {
  return (
    <div>
      {rooms.length > 0 ? (
        rooms.map((room, index) => <RoomPreview room={room} key={index} />)
      ) : (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          No rooms yet. Create one to get started!
        </p>
      )}
    </div>
  );
}
