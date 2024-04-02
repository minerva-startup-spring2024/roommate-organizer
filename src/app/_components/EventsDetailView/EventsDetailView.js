"use client";

require("dotenv").config();
import "../../../App.css";
import { useEffect, useState } from "react";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import styles from "../RoomListDetailView/RoomListDetailView.module.css";
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DateTimePicker from 'react-datetime-picker';
import { Day, Inject, Month, ScheduleComponent, ViewDirective, ViewsDirective, Week } from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  process.env.SYNCFUSION_LICENSE_KEY
);

const EventsDetailView = ({
  listType,
  roomId,
}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
//   const session = useSession(); // tokens - google calendar
//   const supabase = createClientComponentClient(); // google calendar
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const fieldsData = {
    id: { name: 'id' },
    subject: { name: 'title' },
    location: { name: 'location' },
    description: { name: 'description' },
    startTime: { name: 'startTime' },
    endTime: { name: 'endTime' }
  };
  const eventSettings = { 
    includeFiltersInQuery: true, 
    dataSource: events, 
    fields: fieldsData, 
    allowDeleting: true  
  }

  const getEvents = (shouldLoad) => {
    console.log(process.env.SYNCFUSION_LICENSE_KEY)
    fetch(`/api/events?roomId=${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        const dataArray = Object.values(data)
        // Map to Syncfusion's event format
        const mappedEvents = dataArray.map((event) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
          isAllDay: event.isAllDay
        }));
        setEvents(mappedEvents);
        if (shouldLoad) {
          setLoading(false);
        }
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

  useEffect(() => {
    getEvents(true);
  }, [startDate, endDate]);

  const handleActionBegin = async (args) => {
    if (args.requestType === 'eventRemove') {
      // Extract the event ID of the event being deleted
      const eventId = args.deletedRecords[0].id;
  
      try {
        const response = await fetch(`/api/events`, {
            method: "DELETE",
            body: JSON.stringify({
              eventId: eventId,
            }),
          });

        if (response.ok) {
            getEvents(false);

            return response;
        } else {
            console.error('Error deleting event:', response.statusText);
        }
        console.log("Response", response)
        return response;
      } catch (error) {
        console.error('Error deleting event:', error.message);
      }
    } else if (args.requestType === 'eventChange') {
        const updatedEvent =  args.changedRecords[0];
        
        try {
            console.log("EDIT EVENT", updatedEvent);

            const response = await fetch(`/api/events`, {
                method: "PUT", 
                body: JSON.stringify({
                    eventData: updatedEvent,
                })
            });

            if (response.ok) {
                getEvents(false);
                return response;
            } else {
                console.error('Error editing event:', response.statusText);
            }
        } catch (error) {
            console.error('Error editing event:', error.message);
        }
    }
  };

// Google authentication for later integraiton with Google Calendar
//   const googleSignIn = async () => {
//     const { error } = await  supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           scopes: 'https://www.googleapis.com/auth/calendar'
//         }
//       });

//     if (error) {
//       console.log(error);
//       alert("Error logging in to Google provider with Supabase");
//       setErrorMessage(error.message);
//     } else {
//       // redirect("/create-profile");
//       router.refresh();
//     }
//   };

//   async function signOut() {
//     await supabase.auth.signOut();
//   }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className={styles.boxTitle}>{listType}</p>
      {loading ? (
        <GreyBeatLoader />
      ) : (
        <>

            <div>
                <ScheduleComponent 
                // selectedDate={new Date()} 
                readonly={false} 
                eventSettings={eventSettings}
                currentView="Week"
                actionBegin={handleActionBegin}
                >
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

            {/* < div style={{width: "400px", margin: "30px auto"}}>
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
            </div> */}
        </>
      )}
    </div>
  );
};

export default EventsDetailView;
