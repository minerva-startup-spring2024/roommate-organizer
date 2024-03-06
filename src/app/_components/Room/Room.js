"use client";
import { useEffect, useState } from "react";
import AnnouncementsRoomPreviewSection from '../AnnouncementsRoomPreviewSection/AnnouncementsRoomPreviewSection';
import RoomItemPreview from "../RoomItemPreview/RoomItemPreview";
import TopBar from "../TopBar/TopBar";
import styles from "./Room.module.css";

export default function Room({ roomId }) {
  const [loading, setLoading] = useState(true);
  const [roomDetails, setRoomDetails] = useState({
    choreLists: [],
    shoppingLists: [],
    announcements: [],
    members: [],
  });

  useEffect(() => {
    fetch(`/api/rooms?roomId=${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        setRoomDetails(data);
        setLoading(false);
      });
  }, [roomId]);

  return (
    <div>
      <TopBar
        title={roomDetails.name}
        details={true}
        onDetailsClick={console.log("Hi")}
      />
      {!loading && (
        <div className={styles.container}>
           {/* Announcements */}
          <AnnouncementsRoomPreviewSection announcements={roomDetails.announcements} />

          {/* Chore and Shopping Previews */}
          <div className={styles.previewsSection}>
            <RoomItemPreview
              previewTitle="Chores"
              items={
                roomDetails.choreLists.length > 0
                  ? roomDetails.choreLists[0].choreListItems
                  : []
              }
              roomId={roomId}
            />
            <RoomItemPreview
              previewTitle="Shopping Items"
              items={
                roomDetails.shoppingLists.length > 0
                  ? roomDetails.shoppingLists[0].shoppingListItems
                  : []
              }
              roomId={roomId}
            />
          </div>
        </div>
      )}
    </div>
  );
}
