"use client";

import { useRouter } from "next/navigation";

export default function Chore({ chore }) {
  const router = useRouter();
  const handleDelete = async (event) => {
    await fetch(`/api/chores`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: chore.id,
      }),
    });
    router.refresh();
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p>{chore.name}</p>|<p>Created by: {chore.createdById}</p>|
      <p>Assigned to: {chore.createdById}</p>|<p>Status: {chore.status}</p>
      <button onClick={() => handleDelete()}>Delete</button>
    </div>
  );
}
