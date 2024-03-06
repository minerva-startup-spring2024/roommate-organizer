import { NextResponse } from "next/server";
import { getProfileIfMember } from "../../_utils";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/shopping-list-items/{shoppingListItemId}:
 *   patch:
 *     tags:
 *       - Shopping List Items
 *     summary: Update a shoppingListItem
 *     description: Update a shoppingListItem
 *     parameters:
 *       - in: path
 *         name: shoppingListItemId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the shoppingListItem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
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
 *   delete:
 *     tags:
 *       - Shopping List Items
 *     summary: Delete a shoppingListItem
 *     description: Delete a shoppingListItem
 *     parameters:
 *       - in: path
 *         name: shoppingListItemId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the shoppingListItem
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
 *    schemas:
 *      shoppingListItem:
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
    const shoppingListItemId = context.params.shoppingListItemId;

    const shoppingListItem = await prisma.shoppingListItem.findUnique({
      where: {
        id: shoppingListItemId,
      },
      include: {
        shoppingList: true,
      },
    });

    if (!shoppingListItem) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    const profile = await getProfileIfMember(
      shoppingListItem.shoppingList.roomId
    );

    if (!profile) {
      return NextResponse.json(
        { message: "User is not a member of the room" },
        { status: 400 }
      );
    }

    const updateShoppingListItem = await prisma.shoppingListItem.update({
      where: {
        id: shoppingListItemId,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json(
      {
        message: "Updated item",
        shoppingListItem: updateShoppingListItem,
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
    const shoppingListItemId = context.params.shoppingListItemId;

    const shoppingListItem = await prisma.shoppingListItem.findUnique({
      where: {
        id: shoppingListItemId,
      },
      include: {
        shoppingList: true,
      },
    });

    if (!shoppingListItem) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    const profile = await getProfileIfMember(
      shoppingListItem.shoppingList.roomId
    );

    if (!profile) {
      return NextResponse.json(
        { message: "User is not a member of the room" },
        { status: 400 }
      );
    }

    const deleteShoppingListItem = await prisma.shoppingListItem.update({
      where: {
        id: shoppingListItemId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Deleted item",
        shoppingListItem: deleteShoppingListItem,
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
