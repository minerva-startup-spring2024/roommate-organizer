"use client";

import { useEffect, useState } from "react";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import CreateEntityBox from "../CreateEntityBox/CreateEntityBox";
import EntitiesOverview from "../EntitiesOverview";
import styles from "./Building.module.css";

export default function Building({ buildingId }) {
  const [loading, setLoading] = useState(true);
  const [buildingDetails, setBuildingDetails] = useState({
    rooms: [],
    members: [],
  });
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`/api/buildings?buildingId=${buildingId}`)
      .then((res) => res.json())
      .then((data) => {
        setBuildingDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [buildingId]);

  return (
    <>
      {loading ? (
        <GreyBeatLoader />
      ) : (
        <div className={styles.mainBodyContainer}>
          <p className={styles.boxTitle}>Rooms</p>
          <EntitiesOverview
            entity={buildingDetails.rooms}
            entityType={"rooms"}
          />
          <CreateEntityBox
            context={{
              entityType: "room",
              route: "rooms",
              buildingId: buildingId,
            }}
            reload={() => {
              fetch(`/api/buildings?buildingId=${buildingId}`)
                .then((res) => res.json())
                .then((data) => {
                  setBuildingDetails(data);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
          />
        </div>
        // {/* <AnnouncementsRoomPreviewSection
        //   announcements={roomDetails.announcements}
        //   members={roomDetails.members}
        // />
        // <RoomItemPreview
        //   previewTitle="Chores"
        //   items={
        //     roomDetails.choreLists
        //       ? roomDetails.choreLists.choreListItems
        //       : []
        //   }
        //   roomId={roomId}
        //   linkRoute="chores"
        // />
        // <RoomItemPreview
        //   previewTitle="Shopping Items"
        //   items={
        //     roomDetails.shoppingLists
        //       ? roomDetails.shoppingLists.shoppingListItems
        //       : []
        //   }
        //   roomId={roomId}
        //   linkRoute="shopping-list"
        // />
        // <EventsPreview
        //   previewTitle="Events"
        //   roomId={roomId}
        //   linkRoute="events"
        // /> */}
      )}
    </>
  );
}
