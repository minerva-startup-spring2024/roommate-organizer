"use client";

import { registerLicense } from "@syncfusion/ej2-base";
import {
  Day,
  Inject,
  Month,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Week,
} from "@syncfusion/ej2-react-schedule";
import { useEffect, useState } from "react";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import styles from "./EventsDetailView.module.css";

registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY);

const EventsDetailView = ({ roomId }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const eventSettings = {
    includeFiltersInQuery: true,
    dataSource: events,
    allowDeleting: true,
  };

  const getEvents = (shouldLoad) => {
    fetch(`/api/events?roomId=${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        const dataArray = Object.values(data);
        // Map to Syncfusion's event format
        const mappedEvents = dataArray.map((event) => ({
          Id: event.id,
          Subject: event.title,
          Description: event.description ? event.description : "",
          StartTime: new Date(event.startTime),
          EndTime: new Date(event.endTime),
          IsAllDay: event.isAllDay,
          RecurrenceRule: event.recurrenceRule,
          RecurrenceException: event.recurrenceException,
          RecurrenceID: event.recurrenceId,
          StartTimezone: event.startTimezone,
          EndTimezone: event.endTimezone,
          FollowingId: event.followingId,
        }));
        setEvents(mappedEvents);
        if (shouldLoad) {
          setLoading(false);
        }
      });
  };

  const addEvent = async (eventData) => {
    fetch(`/api/events?roomId=${roomId}`, {
      method: "POST",
      body: JSON.stringify({
        roomId: roomId,
        data: {
          title: eventData.Subject,
          description: eventData.Description,
          startTime: eventData.StartTime,
          endTime: eventData.EndTime,
          isAllDay: eventData.IsAllDay,
          location: eventData.Location,
          recurrenceRule: eventData.RecurrenceRule,
          recurrenceId: eventData.RecurrenceID,
          recurrenceException: eventData.RecurrenceException,
          startTimezone: eventData.StartTimezone,
          endTimezone: eventData.EndTimezone,
          followingId: eventData.FollowingId,
        },
      }),
    });
  };

  useEffect(() => {
    getEvents(true);
  }, []);

  const handleActionBegin = async (args) => {
    console.log("ARGS:", args)
    if (args.requestType === "eventCreate") {
      const newEvent = args.data[0];
      try {
        await addEvent(newEvent);
        await getEvents(true);
      } catch (error) {
        console.error("Error adding event:", error.message);
      }
    } else if (args.requestType === "eventRemove") {
      const eventId = args.deletedRecords[0].Id;
      try {
        await fetch(`/api/events`, {
          method: "DELETE",
          body: JSON.stringify({
            eventId: eventId,
          }),
        });
      } catch (error) {
        console.error("Error deleting event:", error.message);
      }
    } else if (args.requestType === "eventChange") {
      const updatedEvent = args.changedRecords[0];
      console.log("updatedEvent",updatedEvent);
      console.log(updatedEvent.RecurrenceException)
      const mappedEvent = {
        id: updatedEvent.Id,
        title: updatedEvent.Subject,
        description: updatedEvent.Description,
        startTime: updatedEvent.StartTime,
        endTime: updatedEvent.EndTime,
        isAllDay: updatedEvent.IsAllDay,
        recurrenceRule: updatedEvent.RecurrenceRule,
        recurrenceId: updatedEvent.RecurrenceID,
        recurrenceException: updatedEvent.RecurrenceException,
        startTimezone: updatedEvent.StartTimezone,
        endTimezone: updatedEvent.EndTimezone,
        followingId: updatedEvent.FollowingId,
      };
      console.log("mapped event", mappedEvent);
      try {
        console.log("parent:", args.data.parent);
        if (args.data.parent === null || args.data.parent === undefined) {
          console.log("Edit event PUT")
          const response = await fetch(`/api/events`, {
            method: "PUT",
            body: JSON.stringify({
              eventData: mappedEvent,
            }),
          });
       } else {
        console.log("Create event POST")
        const response = await fetch(`/api/events?roomId=${roomId}`, {
          method: "POST",
          body: JSON.stringify({
            roomId: roomId,
            data: mappedEvent,
          }),
        });
        await getEvents(true);
       }
      } catch (error) {
        console.error("Error editing event:", error.message);
      }
    }
  };

  return (
    <div className={styles.calendarContainer}>
      {loading ? (
        <GreyBeatLoader />
      ) : (
        <>
          <div>
            <ScheduleComponent
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
        </>
      )}
    </div>
  );
};

export default EventsDetailView;
