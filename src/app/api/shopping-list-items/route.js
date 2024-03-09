import { NextResponse } from "next/server";

import { getProfileIfMember } from "@/app/api/_utils";
import prisma from "../../../../lib/db";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/shopping-list-items:
 *   get:
 *     tags:
 *      - Shopping List Items
 *     summary: Get room's shopping lists
 *     description: Retrieve the shoppingListItem list for a specific room
 *     parameters:
 *       - in: query
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the room
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/shoppingList'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   post:
 *     tags:
 *      - Shopping List Items
 *     summary: Create a new shoppingListItem
 *     description: Create a new shoppingListItem and add it to the shoppingListItem list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                roomId:
 *                  type: string
 *                data:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/shoppingListItem'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * components:
 *  schemas:
 *    shoppingList:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        shoppingListItems:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/shoppingListItem'
 *    Error:
 *      type: object
 *      properties:
 *         message:
 *           type: string
 *    shoppingListItem:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        status:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        assignedToId:
 *          type: string
 *        createdById:
 *          type: string
 */

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

    const shoppingList = await prisma.shoppingList.findUnique({
      where: {
        roomId: roomId,
      },
      include: {
        shoppingListItems: { where: { deletedAt: null } },
      },
    });

    return NextResponse.json({ ...shoppingList }, { status: 200 });
  } catch (error) {
    if (!roomId) {
      return NextResponse.json(
        { message: "No room id provided" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Error getting shopping list", error: error },
      { status: 500 }
    );
  }
}

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

    const shoppingList = await prisma.shoppingList.findFirst({
      where: { roomId: roomId },
    });

    const createShoppingListItem = await prisma.shoppingListItem.create({
      data: {
        shoppingListId: shoppingList.id,
        name: data.name,
        quantity: data.quantity || 1,
        createdById: profile.id,
        assignedToId: data.assignedToId || null,
      },
    });

    return NextResponse.json(
      {
        message: "Created item",
        shoppingListItem: createShoppingListItem,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating item", error: error },
      { status: 500 }
    );
  }
}
