"use client";

import { useState } from "react";
import GreyBeatLoader from "./BeatLoaders/GreyBeatLoader";

export default function AddChoreForm({ roomId }) {
  const [choreName, setChoreName] = useState();
  const [assignedToId, setAssignedToId] = useState();
  const [loading, setLoading] = useState(false);

  const handleSetChoreName = (event) => {
    setChoreName(event.target.value);
  };

  const handleSetAssignedToId = (event) => {
    setAssignedToId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await fetch(`/api/chores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: choreName,
        assignedToId: assignedToId,
        roomId: roomId,
      }),
    });
    setLoading(false);
    setChoreName("");
    setAssignedToId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter chore name"
        value={choreName}
        onChange={handleSetChoreName}
      />
      <input
        type="text"
        placeholder="Enter assigned to name"
        value={assignedToId}
        onChange={handleSetAssignedToId}
      />
      {loading ? <GreyBeatLoader /> : <button type="submit">Add Chore</button>}
    </form>
  );
}
