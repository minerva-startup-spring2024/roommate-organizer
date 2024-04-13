"use client";

import Card from "@/app/_components/Announcements/Card";
import { useEffect, useState } from "react";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import CreatePost from "../CreatePost/CreatePost";

const Announcements = ({ roomId }) => {
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    setLoading(true);
    const response = await fetch(`/api/announcements?roomId=${roomId}`);
    const data = await response.json();
    setAnnouncements(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <>
      <CreatePost roomId={roomId} fetchAnnouncements={fetchAnnouncements} />
      {loading ? (
        <GreyBeatLoader />
      ) : (
        announcements.map((announcement, index) => (
          <Card
            key={index}
            content={announcement.content}
            user={announcement.sentBy}
            updatedAt={announcement.updatedAt}
          />
        ))
      )}
    </>
  );
};

export default Announcements;
