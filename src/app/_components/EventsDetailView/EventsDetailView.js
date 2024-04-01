"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import styles from "../RoomListDetailView/RoomListDetailView.module.css";
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DateTimePicker from 'react-datetime-picker';


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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");

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

            < div style={{width: "400px", margin: "30px auto"}}>
                <input
                    type="text"
                    placeholder={`Add title`}
                    className={styles.addTaskInput}
                    value={eventTitle}
                    onChange={(event) => setEventTitle(event.target.value)}
                />
                <input
                    type="text"
                    placeholder={`Add description`}
                    className={styles.addTaskInput}
                    value={eventDescription}
                    onChange={(event) => setEventDescription(event.target.value)}
                />
                <p> Start of your event</p>
                <DateTimePicker onChange={setStartDate} value={startDate} />
                <p> End of your event</p>
                <DateTimePicker onChange={setEndDate} value={endDate} />
                
                <div> 
                  <button
                    className={styles.addTaskButton}
                    onClick={async () => await addItem()}
                  >
                    Add Event
                  </button>   
                </div>
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
        </>
      )}
    </div>
  );
};

export default EventsDetailView;
