import { getProfileIfMember } from "@/app/api/_utils";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/chore-list-items/{choreListItemId}:
 *   patch:
 *     tags:
 *       - Chore List Items
 *     summary: Update a choreListItem
 *     description: Update a choreListItem
 *     parameters:
 *       - in: path
 *         name: choreListItemId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the choreListItem
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/choreListItem'
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
 *   delete:
 *     tags:
 *       - Chore List Items
 *     summary: Delete a choreListItem
 *     description: Delete a choreListItem
 *     parameters:
 *       - in: path
 *         name: choreListItemId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the choreListItem
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/choreListItem'
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
 *    schemas:
 *      choreListItem:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          name:
 *            type: string
 *          status:
 *           type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 *          assignedToId:
 *            type: string
 *          createdById:
 *            type: string
 *      Error:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 */
export async function PATCH(request, context) {
  const data = await request.json();
  try {
    const choreListItemId = context.params.choreListItemId;

    const choreListItem = await prisma.choreListItem.findUnique({
      where: {
        id: choreListItemId,
      },
      include: {
        choreList: true,
      },
    });

    if (!choreListItem) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    const profile = await getProfileIfMember({
      entityId: choreListItem.choreList.roomId,
      entityType: "room",
    });

    if (!profile) {
      return NextResponse.json(
        { message: "User is not a member of the room" },
        { status: 400 }
      );
    }

    const updatechoreListItem = await prisma.choreListItem.update({
      where: {
        id: choreListItemId,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json(
      {
        message: "Updated item",
        choreListItem: updatechoreListItem,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating item", error: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const choreListItemId = context.params.choreListItemId;

    const choreListItem = await prisma.choreListItem.findUnique({
      where: {
        id: choreListItemId,
      },
      include: {
        choreList: true,
      },
    });

    if (!choreListItem) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    const profile = await getProfileIfMember({
      entityId: choreListItem.choreList.roomId,
      entityType: "room",
    });

    if (!profile) {
      return NextResponse.json(
        { message: "User is not a member of the room" },
        { status: 400 }
      );
    }

    const deletechoreListItem = await prisma.choreListItem.update({
      where: {
        id: choreListItemId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Deleted item",
        choreListItem: deletechoreListItem,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting item", error: error },
      { status: 500 }
    );
  }
}
