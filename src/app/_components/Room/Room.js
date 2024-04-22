"use client";

import { useEffect, useState } from "react";
import AnnouncementsRoomPreviewSection from "../AnnouncementsRoomPreviewSection/AnnouncementsRoomPreviewSection";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import EventsPreview from "../EventsPreview/EventsPreview";
import RoomItemPreview from "../RoomItemPreview/RoomItemPreview";

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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [roomId]);

  useEffect(() => {
    // Apply background color to the body element
    document.body.style.background = "linear-gradient(to right, #f6e0e5, #faedf0)";

    // Cleanup function to remove the style when the component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      {loading ? (
        <GreyBeatLoader />
      ) : (
        <>
          <AnnouncementsRoomPreviewSection
            announcements={roomDetails.announcements}
            members={roomDetails.members}
          />
          <RoomItemPreview
            previewTitle="Chores"
            items={
              roomDetails.choreLists
                ? roomDetails.choreLists.choreListItems
                : []
            }
            roomId={roomId}
            linkRoute="chores"
          />
          <RoomItemPreview
            previewTitle="Shopping Items"
            items={
              roomDetails.shoppingLists
                ? roomDetails.shoppingLists.shoppingListItems
                : []
            }
            roomId={roomId}
            linkRoute="shopping-list"
          />
          <EventsPreview
            previewTitle="Events"
            roomId={roomId}
            linkRoute="events"
          />
        </>
      )}
    </>
  );
}
