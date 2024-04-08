"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import styles from "./CreatePost.module.css";

export default function CreatePost({ roomId, fetchAnnouncements }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await fetch(`/api/announcements`, {
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
    fetchAnnouncements();
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="text"
        placeholder="Enter Announcement Message"
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
