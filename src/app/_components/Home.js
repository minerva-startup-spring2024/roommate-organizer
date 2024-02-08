"use client";

import Link from "next/link";

export default function Home({ rooms }) {
  return (
    <div>
      <h1>Rooms:</h1>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>
            <Link href={`/rooms/${room.id}`}> {room.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
