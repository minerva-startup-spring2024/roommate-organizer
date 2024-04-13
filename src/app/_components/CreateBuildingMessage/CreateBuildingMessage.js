"use client";

import { getProfile } from "@/app/api/_utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import styles from "./CreateBuildingMessage.module.css";

export default function CreateBuildingMessage({ fetchMessages }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // get all rooms
  const getRooms = async () => {
    const profile = getProfile();
    setRooms(profile.rooms);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await fetch(`/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          content: text,
        },
        roomId: roomId,
      }),
    });
    setLoading(false);
    fetchMessages();
    setText("");
  };

  useEffect(() => {
    setLoading(true);
    getRooms();
    setLoading(false);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="text"
        placeholder="Choose room message"
        value={text}
        onChange={handleTextChange}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Enter building message"
        value={text}
        onChange={handleTextChange}
        className={styles.input}
      />
      {loading ? (
        <GreyBeatLoader />
      ) : (
        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      )}
    </form>
  );
}
