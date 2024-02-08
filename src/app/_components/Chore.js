"use client";

import { useRouter } from "next/navigation";

export default function Chore({ chore }) {
  const router = useRouter();
  const handleDelete = async (event) => {
    const choreId = "your_chore_id"; // Replace "your_chore_id" with the actual chore id
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
      <p>{chore.name}</p>|<p>{chore.addedById}</p>|
      <button onClick={() => handleDelete()}>Delete</button>
    </div>
  );
}
