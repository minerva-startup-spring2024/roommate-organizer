"use client";


import { useState } from "react";
import styles from "./CreateRoomBox.module.css";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";



export default function CreateRoomBox({ context }) {
  const searchParams = useSearchParams();
  const router=useRouter();
  

  const [roomName, setRoomName] = useState("");

  const handleInputChange = (event) => {
    setRoomName(event.target.value);
  };

  const buildingId=searchParams.get('buildingId');

  console.log(context.user)

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/api/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: roomName,
        user: context.user,
        buildingId
      }),
    });
    router.refresh();
    setRoomName("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="text"
        placeholder="Enter room name"
        value={roomName}
        onChange={handleInputChange}
        className={styles.previewText}
      />
      <button type="submit" className={styles.submitButton}>
        +
      </button>
    </form>
  );
}

// export default function RoomPreview({ room }) {
//   return (
//     <Link className={styles.container} href={`/rooms/${room.id}`}>
//       <p className={styles.previewText}>{room.name}</p>
//       <div className={styles.memberContainer}>
//         <FaUserGroup style={{ marginRight: 10 }} color={"#373943"} />
//         <p className={styles.previewText}> {room.members.length}</p>
//       </div>
//     </Link>
//   );
// }
