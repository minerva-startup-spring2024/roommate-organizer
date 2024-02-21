"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddRoomForm({ context }) {
  const router = useRouter();

  const [roomName, setRoomName] = useState("");

  const handleInputChange = (event) => {
    setRoomName(event.target.value);
  };

//   const { rooms, ...userWithoutRooms } = context.user;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/api/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: roomName,
        user: context.user
      }),
    });
    router.refresh();
    setRoomName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter room name"
        value={roomName}
        onChange={handleInputChange}
      />
      <button type="submit">Add Room</button>
    </form>
  );
}
