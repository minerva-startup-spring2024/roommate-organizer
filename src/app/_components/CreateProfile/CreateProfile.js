"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import styles from "./CreateProfile.module.css";

export default function CreateProfile() {
  const router = useRouter();
  const supabase = createClient();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    profileImage: "",
  });
  const [uploading, setUploading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [localProfileImage, setLocalProfileImage] = useState(null);
  const [error, setError] = useState(null);

  async function uploadAvatar(event) {
    try {
      setUploading(true);
      let reader = new FileReader();

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      reader.onload = (e) => {
        setLocalProfileImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setProfileData((prevData) => ({
        ...prevData,
        profileImage: filePath,
      }));
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    const createProfile = await fetch(`/api/profiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...profileData,
      }),
    });
    if (createProfile.status == 200) {
      router.push("/app");
    } else {
      setError(createProfile.statusText);
      setSubmitLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profilePicContainer}>
        {localProfileImage ? (
          <Image
            src={localProfileImage}
            alt="Profile Picture"
            width={200}
            height={200}
            className={styles.profilePic}
          />
        ) : (
          <div className={styles.profilePic}>
            {uploading ? <BeatLoader size={10} /> : "Upload Profile Picture"}
          </div>
        )}
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={uploadAvatar}
          className={styles.fileInput}
        />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={profileData.firstName}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={profileData.lastName}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <button
          type="submit"
          className={
            !profileData.firstName || !profileData.lastName
              ? styles.buttonDisabled
              : styles.button
          }
          disabled={!profileData.firstName || !profileData.lastName}
        >
          {submitLoading ? (
            <BeatLoader size={8} color={"white"} />
          ) : (
            "Create Profile"
          )}
        </button>
      </form>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
