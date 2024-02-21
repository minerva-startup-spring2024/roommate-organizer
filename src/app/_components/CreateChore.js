"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddChoreForm({ context }) {
  const router = useRouter();

  const [choreName, setChoreName] = useState("");

  const handleInputChange = (event) => {
    setChoreName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/api/chores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        choreListId: context.choreList.id,
        name: choreName,
        createdById: context.user.id,
      }),
    });
    router.refresh();
    setChoreName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter chore name"
        value={choreName}
        onChange={handleInputChange}
      />
      <button type="submit">Add Chore</button>
    </form>
  );
}
