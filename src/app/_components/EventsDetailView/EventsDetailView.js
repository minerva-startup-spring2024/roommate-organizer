"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import styles from "../RoomListDetailView/RoomListDetailView.module.css";
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


const EventsDetailView = ({
  listType,
  endpoint,
  attributeName,
  roomId,
  userProfile,
}) => {
  const [memberSelectionStatus, setMemberSelectionStatus] = useState(false);
  const [addItemBoxAssignedTo, setAddItemBoxAssignedTo] = useState(null);
  const [addItemBoxName, setAddItemBoxName] = useState("");
  const [items, setItems] = useState([]);
  const [members, setMembers] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const session = useSession(); // tokens
//   const supabase = useSupabaseClient(); // talk to supabase!
  const supabase = createClientComponentClient();

  const getItems = (shouldLoad) => {
    fetch(`/api/${endpoint}?roomId=${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data[attributeName]);
        if (shouldLoad) {
          setLoading(false);
        }
      });
  };

  const getMembers = () => {
    fetch(`/api/rooms/${roomId}/members`)
      .then((res) => res.json())
      .then((data) => {
        setMembers(data.members);
      });
  };

  const addItem = async () => {
    fetch(`/api/${endpoint}?roomId=${roomId}`, {
      method: "POST",
      body: JSON.stringify({
        roomId: roomId,
        data: {
          name: addItemBoxName,
          assignedToId: addItemBoxAssignedTo ? addItemBoxAssignedTo.id : null,
        },
      }),
    }).then(() => {
      getItems(false);
      setAddItemBoxName("");
      setAddItemBoxAssignedTo(null);
    });
  };

  const handleUpdateItemBoxStatus = (itemId, itemStatus) => {
    const newItemStatus = itemStatus === "DONE" ? "OPEN" : "DONE";
    const updatedItems = items.map((t) =>
      t.id === itemId
        ? {
            ...t,
            status: newItemStatus,
          }
        : t
    );
    setItems(updatedItems);
    fetch(`/api/${endpoint}/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: newItemStatus,
      }),
    }).then(() => getItems(false));
  };

  const handleInputChange = (event) => {
    setAddItemBoxName(event.target.value);
  };

  useEffect(() => {
    getItems(true);
    getMembers();
  }, []);


  const googleSignIn = async () => {
    const { error } = await  supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'https://www.googleapis.com/auth/calendar'
        }
      });

    if (error) {
      console.log(error);
      alert("Error logging in to Google provider with Supabase");
      setErrorMessage(error.message);
    } else {
      // redirect("/create-profile");
      router.refresh();
    }
  };

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function singOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className={styles.taskList}>
      <p className={styles.boxTitle}>{listType}</p>
      {loading ? (
        <GreyBeatLoader />
      ) : (
        <>
          <div className={styles.filterButtons}>
            <button
              className={filterCategory === "all" ? styles.active : ""}
              onClick={() => setFilterCategory("all")}
            >
              All
            </button>
            <button
              className={filterCategory === "to do" ? styles.active : ""}
              onClick={() => setFilterCategory("to do")}
            >
              To Do
            </button>
            <button
              className={filterCategory === "my" ? styles.active : ""}
              onClick={() => setFilterCategory("my")}
            >
              My
            </button>
          </div>
          <div className={styles.taskContainer}>
            {items
              .filter((item) => {
                if (filterCategory === "to do") {
                  return item.status === "OPEN";
                } else if (filterCategory === "my") {
                  return item.assignedToId === userProfile.id;
                }
                return true;
              })
              .map((item) => (
                <div
                  key={item.id}
                  className={item.status === "DONE" ? styles.completed : ""}
                >
                  <label className={styles.taskLabel}>
                    <input
                      type="checkbox"
                      checked={item.status === "DONE" ? styles.completed : ""}
                      onChange={() =>
                        handleUpdateItemBoxStatus(item.id, item.status)
                      }
                      className={styles.taskCheckbox}
                    />
                    <Image
                      src={
                        item.assignedTo
                          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${item.assignedTo.profileImage}`
                          : "/default.png"
                      }
                      alt={
                        item.assignedTo
                          ? item.assignedTo.profileImage
                          : "No alt"
                      }
                      width={25}
                      height={25}
                      className={styles.itemImage}
                    />
                    {item.name}
                  </label>
                </div>
              ))}
          </div>
          <div className={styles.addTaskButtonContainer}>
            {memberSelectionStatus && (
              <div className={styles.selectAssignedTo}>
                {members.map((member) => (
                  <div
                    className={styles.memberContainer}
                    key={`image-${member.id}`}
                    onClick={() => {
                      setAddItemBoxAssignedTo(member);
                      setMemberSelectionStatus(false);
                    }}
                  >
                    <Image
                      src={
                        member.profileImage
                          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${member.profileImage}`
                          : "/default.png"
                      }
                      alt={member.profileImage ? member.profileImage : "No alt"}
                      width={25}
                      height={25}
                      className={styles.itemImage}
                    />
                    <p className={styles.memberName}>
                      {member.firstName} {member.lastName}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.addTaskModal}>
              <div
                className={styles.emptySelectPersonContainer}
                onClick={() => setMemberSelectionStatus(true)}
              >
                {addItemBoxAssignedTo ? (
                  <Image
                    src={
                      addItemBoxAssignedTo.profileImage
                        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${addItemBoxAssignedTo.profileImage}`
                        : "/default.png"
                    }
                    alt={
                      addItemBoxAssignedTo.profileImage
                        ? addItemBoxAssignedTo.profileImage
                        : "No alt"
                    }
                    width={30}
                    height={30}
                    className={styles.itemImage}
                  />
                ) : (
                  <div className={styles.emptySelectPersonCircle} />
                )}
              </div>
              <input
                type="text"
                placeholder={`Add a ${listType.slice(0, -1)}...`}
                className={styles.addTaskInput}
                value={addItemBoxName}
                onChange={handleInputChange}
              />
              <button
                className={styles.addTaskButton}
                onClick={async () => await addItem()}
              >
                Add
              </button>
            </div>

            < div style={{width: "400px", margin: "30px auto"}}>
                {session ? 
                    <>
                        <h2> Hey there {session.user.email}</h2>
                        <button onClick={() => signOut()}> Sign Out</button>
                    </>
                    :
                    <>
                        <button onClick={() => googleSignIn()}> Sign in with Google</button>
                    </>
                }
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default EventsDetailView;
