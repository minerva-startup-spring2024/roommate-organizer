"use client";

import { useEffect, useState } from "react";
import AnnouncementsRoomPreviewSection from "../AnnouncementsRoomPreviewSection/AnnouncementsRoomPreviewSection";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import EventsPreview from "../EventsPreview/EventsPreview";
import RoomItemPreview from "../RoomItemPreview/RoomItemPreview";
import CreateRoomAnnouncement from "../AnnouncementRoomCreate/CreateRoomAnnouncement";

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
        <div>
          <AnnouncementsRoomPreviewSection
            announcements={roomDetails.announcements}
            members={roomDetails.members}
          />
          <CreateRoomAnnouncement
            announcements={roomDetails.announcements}
            members={roomDetails.members}
            roomId={roomId}
            linkRoute="announcements"
            previewTitle="Announcements"
          />
        </div>
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
