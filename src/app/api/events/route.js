import { NextResponse } from "next/server";

import prisma from "../../../../lib/db";
import { getProfileIfMember } from "../_utils";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/events:  
 *   post:
 *     tags:
 *      - Event
 *     summary: Create a new event
 *     description: Create a new event and add it to a roomId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                roomId:
 *                  type: string
 *                  description: ID of the room where the event will be created
 *                data:
 *                  type: object
 *                  required: true
 *                  properties:
 *                    title:
 *                      type: string
 *                      description: Title of the event
 *                    description:
 *                      type: string
 *                      description: Optional description of the event
 *                    startTime:
 *                      type: string
 *                      format: date-time  
 *                      description: Start time of the event (format depends on implementation)
 *                    endTime:
 *                      type: string
 *                      format: date-time 
 *                      description: End time of the event (format depends on implementation)
 *                    isAllDay:
 *                      type: boolean
 *                      default: false
 *                      description: Flag indicating if event is all day
 *                    location:
 *                      type: string
 *                      description: Optional location of the event
 *                    category:
 *                      type: string
 *                      description: Optional category of the event
 *                    metadata:
 *                      type: object
 *                      description: Optional JSON object for additional event details
 *     responses:
 *       200:
 *         description: Successful event creation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 event:
 *                   type: object
 *                   description: The created event object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique identifier for the event (generated by Prisma)
 *                     createdById:
 *                       type: string
 *                       description: ID of the user who created the event
 *                     createdAt:
 *                       type: string
 *                       format: date-time  
 *                       description: Timestamp of when the event was created
 *                     title:
 *                       type: string
 *                       description: Title of the event
 *                     description:
 *                       type: string
 *                       description: Optional description of the event
 *                     startTime:
 *                       type: string
 *                       format: date-time 
 *                       description: Start time of the event
 *                     endTime:
 *                       type: string
 *                       format: date-time  
 *                       description: End time of the event
 *                     isAllDay:
 *                       type: boolean
 *                       description: Flag indicating if event is all day
 *                     location:
 *                       type: string
 *                       description: Optional location of the event
 *                     category:
 *                       type: string
 *                       description: Optional category of the event
 *                     metadata:
 *                       type: object
 *                       description: Optional JSON object for additional event details
 *                     roomId:
 *                       type: string
 *                       description: ID of the room where the event belongs
 *       400:
 *         description: Bad request (missing data or user not a member)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                 error:
 *                   type: object
 *                   description: Detailed error information (optional)
 */

export async function POST(request, context) {
    const { roomId, data } = await request.json();

    if (!roomId) {
      return NextResponse.json(
        { message: "No room id provided" },
        { status: 400 }
      );
    }

    try {
      const profile = await getProfileIfMember(roomId);

      if (!profile) {
        return NextResponse.json(
          { message: "User is not a member of the room" },
          { status: 400 }
        );
      }

      console.log(data)
      const createEvent = await prisma.event.create({
        data: {
          createdById: profile.id,
          roomId: roomId,
          title: data.title,
          description: data.description,
          startTime: data.startDate,
          endTime: data.endDate,
        },
      });

      console.log(createEvent)

      return NextResponse.json(
        {
          message: "Created event",
          event: createEvent,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error creating event", error: error },
        { status: 500 }
      );
    }
}

export async function GET(request, context) {
  const roomId = request.nextUrl.searchParams.get("roomId");
  try {
    const profile = await getProfileIfMember(roomId);

    if (!profile) {
      return NextResponse.json(
        { message: "User is not a member of the room" },
        { status: 400 }
      );
    }

    const events = await prisma.event.findMany({
        where: {
          roomId: roomId,
        }
      });

    return NextResponse.json({ ...events }, { status: 200 });
  } catch (error) {
    if (!roomId) {
      return NextResponse.json(
        { message: "No room id provided" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Error getting events", error: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
    const { eventId } = await request.json();
  
    console.log("DELETE ROUTE event", eventId)
    try {
      const deletedEvent = await prisma.event.delete({
        where: {
          id: eventId
        }
      });
  
      return NextResponse.json({ message: "Event deleted successfully", event: deletedEvent}, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting event", error: error },
            { status: 500 }
        );
    }
  }

  export async function PUT(request, context) {
    console.log("put request", request)
    const data = await request.json();
    const eventData = data.eventData;
    console.log("event data", eventData)
    console.log("id", eventData.id)

    try {
        const updatedEvent = await prisma.event.update({
            where: {
                id: eventData.id
            },
            data: {
                title: eventData.title,
                startTime: eventData.startTime,
                endTime: eventData.endTime,
                isAllDay: eventData.isAllDay,
                location: eventData.location,
                description: eventData.description,
            }
        });

        return NextResponse.json({ message: "Event updated successfully", event: updatedEvent }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error updating event", error: error }, { status: 500 });
    }
}

