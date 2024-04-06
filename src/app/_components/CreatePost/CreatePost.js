"use client";

import { useRouter } from "next/router";
import { useState } from "react";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import Card from "./Card"; 
import styles from "./CreatePost.css";

export default function CreatePost() {
  const router = useRouter();

  const [fullName, setName] = useState("");
  const [text, setText] = useState(""); 
  const [image, setImage] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handlefullNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTextChange = (event) => { 
    setText(event.target.value);
  };

  const handleImageChange = (event) => { 
    setImage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Assuming the context.user exists
    await fetch(`/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fullName,
      }),
    });
    setLoading(false);
    router.refresh();
    setName("");
    setText(""); 
    setImage(""); 
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="text"
        placeholder="Enter full name"
        value={fullName}
        onChange={handlefullNameChange}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Enter Announcement Message" 
        value={text}
        onChange={handleTextChange}
        className={styles.input}
      />
      
      <input
        type="text"
        placeholder="Enter card image URL" // New input field for image
        value={image}
        onChange={handleImageChange}
        className={styles.input}
      />
      {loading ? (
        <GreyBeatLoader />
      ) : (
        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      )}
      {/* Render the Card component with the entered data */}
      <Card image={image} fullName={fullName} text={text} />
    </form>
  );
}
