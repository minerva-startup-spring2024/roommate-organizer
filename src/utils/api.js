import { v4 as uuidv4 } from "uuid";
import prisma from "../../lib/db";
import isAuthenticated from "./authWrapper";

export async function getProfile(context) {
  const { user } = await isAuthenticated();

  const res = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      rooms: {
        include: {
          members: true,
          choreLists: { include: { choreListItems: true } },
          shoppingLists: { include: { shoppingListItems: true } },
        },
      },
      buildings:{
        include:{
          rooms:{include:{announcements:true}}
        }       
      }
    },
  });

  return res;
}

export async function getRoomDetails(context) {
  const res = await prisma.room.findUnique({
    where: {
      id: context.room.id,
    },
    include: {
      choreLists: {
        include: {
          choreListItems: true,
        },
      },
      shoppingLists: {
        include: {
          shoppingListItems: true,
        },
      },
      members: true,
      announcements:true
    },
  });

  return res;
}

export async function createChoresListItem(choreData) {
  const res = await prisma.choreListItem.create({
    data: {
      id: uuidv4(),
      choreListId: choreData.choreListId,
      addedById: choreData.addedById,
      name: choreData.name,
      description: choreData.description,
    },
  });

  return res;
}

export async function createShoppingListImte(shoppingItemData) {
  const res = await prisma.shoppingListItem.create({
    data: {
      id: uuidv4(),
      listId: shoppingItemData.shoppingListId,
      addedById: shoppingItemData.addedById,
      name: shoppingItemData.name,
      quantity: shoppingItemData.quantity,
    },
  });

  return res;
}


