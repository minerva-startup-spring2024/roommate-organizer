"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import styles from "./CreateEntityBox.module.css";

export default function CreateEntityBox({ context, reload }) {
  const router = useRouter();

  const [entityName, setEntityName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setEntityName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await fetch(`/api/${context.route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: entityName,
        buildingId: context.buildingId,
      }),
    });
    setLoading(false);
    router.refresh();
    if (reload) {
      reload();
    }
    setEntityName("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="text"
        placeholder={`Enter ${context.entityType} name`}
        value={entityName}
        onChange={handleInputChange}
        className={styles.previewText}
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

//correct version