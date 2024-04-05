"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import styles from "./CreateProfile.module.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export default function CreateRoomBox({ context }) {
    const router = useRouter();
  
    const [roomName, setRoomName] = useState("");
    const [description, setDescription] = useState(""); // New state for description
    const [loading, setLoading] = useState(false);
  
    const handleRoomNameChange = (event) => {
      setRoomName(event.target.value);
    };
  
    const handleDescriptionChange = (event) => { // New function to handle description change
      setDescription(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      await fetch(`/api/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: roomName,
          description: description, // Include description in the request body
          user: context.user,
        }),
      });
      setLoading(false);
      router.refresh();
      setRoomName("");
      setDescription(""); // Reset description state
    };
  
    return (
      <form onSubmit={handleSubmit} className={styles.container}>
        <input
          type="text"
          placeholder="Enter room name"
          value={roomName}
          onChange={handleRoomNameChange}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Enter room description" // New input field for description
          value={description}
          onChange={handleDescriptionChange}
          className={styles.input}
        />
        {loading ? (
          <GreyBeatLoader />
        ) : (
          <button type="submit" className={styles.submitButton}>
            +
          </button>
        )}
      </form>
    );
  }
  