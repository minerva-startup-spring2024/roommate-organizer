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
          FollowingID: event.followingId,
        }));
        setEvents(mappedEvents);
        if (shouldLoad) {
          setLoading(false);
        }
      });
  };

  const addEvent = async (eventData) => {
    await fetch(`/api/events?roomId=${roomId}`, {
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
    }).then(() => {
      getEvents(true);
    });
  };

  useEffect(() => {
    getEvents(true);
  }, []);


  const handleActionComplete = async (args) => {
    if (args.addedRecords && Array.isArray(args.addedRecords)) {
    args.addedRecords.forEach(async (addedRecord) => {
      const event = addedRecord;
      const mappedEvent = {
        id: event.Id,
        title: event.Subject,
        description: event.Description,
        startTime: event.StartTime,
        endTime: event.EndTime,
        isAllDay: event.IsAllDay,
        recurrenceRule: event.RecurrenceRule,
        recurrenceId: event.RecurrenceID,
        recurrenceException: event.RecurrenceException,
        startTimezone: event.StartTimezone,
        endTimezone: event.EndTimezone,
        followingId: event.FollowingId,
      };
    
      try {
        await fetch(`/api/events?roomId=${roomId}`, {
          method: "POST",
          body: JSON.stringify({
            roomId: roomId,
            data: mappedEvent,
          }),
        });
      } catch (error) {
        console.error("Error updating event:", error.message);
      }
    });    
  }

  if (args.changedRecords && Array.isArray(args.changedRecords)) {
    args.changedRecords.forEach(async (updatedRecord) => {
      const event = updatedRecord;
      const mappedEvent = {
        id: event.Id,
        title: event.Subject,
        description: event.Description,
        startTime: event.StartTime,
        endTime: event.EndTime,
        isAllDay: event.IsAllDay,
        recurrenceRule: event.RecurrenceRule,
        recurrenceId: event.RecurrenceID,
        recurrenceException: event.RecurrenceException,
        startTimezone: event.StartTimezone,
        endTimezone: event.EndTimezone,
        followingId: event.FollowingId,
      };
    
      try {
        await fetch(`/api/events`, {
          method: "PUT",
          body: JSON.stringify({
            eventData: mappedEvent,
          }),
        });
      } catch (error) {
        console.error("Error updating event:", error.message);
      }
    });    
  }

  if (args.deletedRecords && Array.isArray(args.deletedRecords)) {
    args.deletedRecords.forEach(async (deletedRecord) => {
      const eventId = deletedRecord.Id; 
    
      try {
        await fetch(`/api/events`, {
          method: "DELETE",
          body: JSON.stringify({
            eventId: eventId,
          }),
        });
      } catch (error) {
        console.error("Error updating event:", error.message);
      }
    });   
  }
    await getEvents(true);
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
              // actionBegin={handleActionBegin}
              actionComplete={handleActionComplete}
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
