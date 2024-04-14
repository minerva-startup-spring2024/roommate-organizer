"use client";

import Card from "@/app/_components/Announcements/Card";
import { useEffect, useState } from "react";
<<<<<<< HEAD
=======
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
>>>>>>> 503c1392fc6dd08bd4d2a28ce4d2f61e40209406
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
<<<<<<< HEAD
    <div>
      <CreatePost roomId={roomId} fetchAnnouncements={fetchAnnouncements} />
      {announcements.map((announcement, index) => (
        <Card
          key={index}
          content={announcement.content}
          user={announcement.sentBy}
          updatedAt={announcement.updatedAt}
        />
      ))}
    </div>
=======
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
>>>>>>> 503c1392fc6dd08bd4d2a28ce4d2f61e40209406
  );
};

export default Announcements;
