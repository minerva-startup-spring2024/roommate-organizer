"use client";

import Card from "@/app/_components/Announcements/Card";
import { useEffect, useState } from "react";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
// import CreatePost from "../CreatePost/CreatePost";
import Select from "react-dropdown-select";
import styles from "./Messages.module.css";

const Messages = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [newMessageModalStatus, setNewMessageModalStatus] = useState(false);
  const [roomOptions, setRoomOptions] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [sendMessageLoading, setSendMessageLoading] = useState(false);

  const handleTextChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSendMessageLoading(true);
    await fetch(`/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          content: content,
        },
        roomId: selectedRoomId[0].value,
      }),
    }).then(() => {
      fetchMessages();
      setContent("");
      setSelectedRoomId(null);
      setNewMessageModalStatus(false);
    });
    setSendMessageLoading(false);
  };

  const handleCloseModal = () => {
    setNewMessageModalStatus(false);
    setSelectedRoomId(null);
    setContent("");
    setSendMessageLoading(false);
  };

  const formatRoomOptions = () => {
    const eligibleRooms = user.rooms.filter((room) =>
      room.members.some((member) => member.role === "MANAGER")
    );

    const formattedRooms = eligibleRooms.map((room) => {
      return { value: room.id, label: room.name };
    });

    setRoomOptions(formattedRooms);
  };

  const fetchMessages = async () => {
    setLoading(true);
    const response = await fetch(`/api/messages`);
    const data = await response.json();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
    formatRoomOptions();
  }, []);

  return (
    <>
      <button
        className={styles.addMessageModal}
        onClick={() => setNewMessageModalStatus(true)}
      >
        Send a new message
      </button>
      {newMessageModalStatus && (
        <form className={styles.newMessageContainer} onSubmit={handleSubmit}>
          <div className={styles.messageModal}>
            {roomOptions.length === 0 ? (
              "There is no building manager for your rooms."
            ) : (
              <>
                <div className={styles.modalRow} key={"choose-room"}>
                  <label>
                    <p>Choose room</p>
                  </label>
                  <Select
                    options={roomOptions}
                    onChange={(value) => setSelectedRoomId(value)}
                    className={styles.dropdownSelection}
                  />
                </div>
                {selectedRoomId && (
                  <div className={styles.modalRow} key={"add-message"}>
                    <textarea
                      type="text"
                      placeholder="Your message"
                      value={content}
                      onChange={handleTextChange}
                      className={styles.textarea}
                    />
                  </div>
                )}
                {sendMessageLoading ? (
                  <div style={{ margin: "auto" }}>
                    <GreyBeatLoader />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={
                      (selectedRoomId === null) | (content.length === 0)
                    }
                  >
                    Send
                  </button>
                )}
              </>
            )}
            <button
              className={styles.closeContainer}
              onClick={() => handleCloseModal()}
            >
              Close
            </button>
          </div>
        </form>
      )}
      {/* <CreatePost roomId={roomId} fetchMessages={fetchMessages} /> */}
      {loading ? (
        <GreyBeatLoader />
      ) : (
        messages.map((message, index) => (
          <Card
            key={index}
            content={message.content}
            user={message.sentBy}
            updatedAt={message.updatedAt}
          />
        ))
      )}
    </>
  );
};

export default Messages;