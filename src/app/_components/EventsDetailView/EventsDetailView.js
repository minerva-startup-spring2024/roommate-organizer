"use client";

import "../../../App.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import styles from "../RoomListDetailView/RoomListDetailView.module.css";
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DateTimePicker from 'react-datetime-picker';
import { Day, Inject, Month, ScheduleComponent, ViewDirective, ViewsDirective, Week } from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
    "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx+WmFZfVpgdVVMZVpbRnFPMyBoS35RckVnWX5fcHFTRGdbVkRz"
);


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
  const [events, setEvents] = useState([]);
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
  const calendarData = [
    {
        Id: 1,
        Subject: "Event 1",
        StartTime: new Date(2025, 1, 11, 10, 0),
        EndTime: new Date(2025, 1, 11, 12, 30),
        IsAllDay: false
    }
  ]

  const getEvents = (shouldLoad) => {
    fetch(`/api/events?roomId=${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data[attributeName]);
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

  const addEvent = async () => {
    fetch(`/api/events?roomId=${roomId}`, {
      method: "POST",
      body: JSON.stringify({
        roomId: roomId,
        data: {
          title: eventTitle,
          description: eventDescription,
          startDate: startDate,
          endDate: endDate,
        },
      }),
    }).then(() => {
      getEvents(false);
      setEventTitle("");
      setEventDescription(null);
      setStartDate(new Date());
      setEndDate(new Date());
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
    }).then(() => getEvents(false));
  };

  useEffect(() => {
    getEvents(true);
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
    <div className="flex justify-center items-center min-h-screen">
      <p className={styles.boxTitle}>{listType}</p>
      {loading ? (
        <GreyBeatLoader />
      ) : (
        <>

            <div>
                <ScheduleComponent 
                eventSettings = {{
                    dataSource: calendarData,
                }}
                selectedDate={new Date(2025, 1, 11)}
                currentView="Week">
                  <ViewsDirective>
                    <ViewDirective option="Day" />
                    <ViewDirective option="Week" />
                    <ViewDirective option="Month" />
                  </ViewsDirective>

                  <Inject services={[Day, Week, Month]} />
                </ScheduleComponent>
            </div>
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
                    onClick={async () => await addEvent()}
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
