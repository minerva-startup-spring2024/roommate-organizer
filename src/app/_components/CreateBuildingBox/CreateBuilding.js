"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddBuildingForm({ context }) {
  const router = useRouter();

  const [buildingName, setBuildingName] = useState("");
  const [address, setAddress] = useState("");

  const handleInputBuildingName = (event) => {
    setBuildingName(event.target.value);
  };

  const handleInputAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!context.user || !context.user.id) {
      console.error("User ID is missing");
      return;
    }
    console.log(context.user.name)
    await fetch(`/api/buildings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buildingOwnerId: context.user.id,
        name: buildingName,
        address: address,
      }),
    });
    router.refresh(); 
    setBuildingName("");
    setAddress("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter building name"
        value={buildingName}
        onChange={handleInputBuildingName}
        required
      />
      <input
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={handleInputAddress}
        required
      />
      <button type="submit">Add Building</button>

    </form>
  );
}

