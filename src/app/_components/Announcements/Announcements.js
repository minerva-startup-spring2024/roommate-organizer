"use client";

import Card from "@/app/_components/Announcements/Card";
import { useEffect, useState } from "react";
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
  );
};

export default Announcements;
//testing
