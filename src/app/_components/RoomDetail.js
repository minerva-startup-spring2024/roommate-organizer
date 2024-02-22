"use client";

import { useEffect, useState } from "react";
import Chore from "./Chore";
import AddChoreForm from "./CreateChore";

export default function RoomDetail({ roomId }) {
  const [choreListItems, setChoreListItems] = useState([]);
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [announcementsList, setAnnouncements] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});

  useEffect(() => {
    fetch(`/api/chores?roomId=${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        setChoreListItems(data.choreListItems);
      });
  }, [roomId]);

  return (
    <div>
      <h1></h1>
      <h1>Chores</h1>
      <ul>
        {choreListItems.map((chore, index) => (
          <Chore key={index} chore={chore} />
        ))}
      </ul>
      <AddChoreForm roomId={roomId} />

      <h1>Shopping List</h1>
      <ul>
        {shoppingListItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>

      <h1>Members</h1>
      {/* <ul>
        {roomDetails.members.map((member, index) => (
          <li key={index}>{member.userId}</li>
        ))}
      </ul> */}
    </div>
  );
}
