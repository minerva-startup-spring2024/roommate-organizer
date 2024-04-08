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
          startDate: eventData.StartTime,
          endDate: eventData.EndTime,
          isAllDay: eventData.IsAllDay,
        },
      }),
    });
  };

  useEffect(() => {
    getEvents(true);
  }, []);

  const handleActionBegin = async (args) => {
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
      const mappedEvent = {
        id: updatedEvent.Id,
        title: updatedEvent.Subject,
        description: updatedEvent.Description,
        startTime: updatedEvent.StartTime,
        endTime: updatedEvent.EndTime,
        isAllDay: updatedEvent.IsAllDay,
      };
      try {
        const response = await fetch(`/api/events`, {
          method: "PUT",
          body: JSON.stringify({
            eventData: mappedEvent,
          }),
        });
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
