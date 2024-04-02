"use client";

import { useEffect, useState } from "react";
import AnnouncementsRoomPreviewSection from "../AnnouncementsRoomPreviewSection/AnnouncementsRoomPreviewSection";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import RoomItemPreview from "../RoomItemPreview/RoomItemPreview";
import EventsPreview from "../EventsPreview/EventsPreview";
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
    <>
      {loading ? (
        <GreyBeatLoader />
      ) : (
        <>
          <AnnouncementsRoomPreviewSection
            announcements={roomDetails.announcements}
          />
          <RoomItemPreview
            previewTitle="Chores"
            items={
              roomDetails.choreLists.length > 0
                ? roomDetails.choreLists[0].choreListItems
                : []
            }
            roomId={roomId}
            linkRoute="chores"
          />
          <RoomItemPreview
            previewTitle="Shopping Items"
            items={
              roomDetails.shoppingLists.length > 0
                ? roomDetails.shoppingLists[0].shoppingListItems
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
