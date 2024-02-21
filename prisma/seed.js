const { PrismaClient } = require("@prisma/client");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const prisma = new PrismaClient();

async function main() {
  const adminUser = await supabase.auth.signUp({
    email: "admin@example.com",
    password: "test123",
  });

  const primaryUser = await supabase.auth.signUp({
    email: "user_primary@example.com",
    password: "test123",
  });

  const secondaryUser = await supabase.auth.signUp({
    email: "user_secondary@example.com",
    password: "test123",
  });

  // Seed data for Profile
  const primaryProfile = await prisma.profile.create({
    data: {
      firstName: "Primary",
      lastName: "Roommate",
      role: "roommate",
      userId: primaryUser.data.user.id,
    },
  });

  const secondaryProfile = await prisma.profile.create({
    data: {
      firstName: "Secondary",
      lastName: "Roommate",
      role: "roommate",
      userId: secondaryUser.data.user.id,
    },
  });

  const adminProfile = await prisma.profile.create({
    data: {
      firstName: "Minerva",
      lastName: "Manager",
      role: "manager",
      profileImage:
        "https://upload.wikimedia.org/wikipedia/commons/f/fb/Minerva_Logo_cntr_blk.png",
      userId: adminUser.data.user.id,
    },
  });

  // Seed data for Building
  const building = await prisma.building.create({
    data: {
      name: "SF Residence Hall",
      address: "16 Turk St",
      metadata: { floors: 5 },
      buildingOwnerId: adminProfile.id,
    },
  });

  // Seed data for Room
  const room = await prisma.room.create({
    data: {
      name: "101",
      buildingId: building.id,
      members: {
        connect: [{ id: primaryProfile.id }, { id: secondaryProfile.id }],
      },
    },
  });

  // Seed data for ChoreList
  const choreList = await prisma.choreList.create({
    data: {
      roomId: room.id,
    },
  });

  // Seed data for ChoreListItem
  const choreListItem = await prisma.choreListItem.create({
    data: {
      name: "Take out trash",
      type: "Weekly",
      status: "Pending",
      choreListId: choreList.id,
      createdById: primaryProfile.id,
      assignedToId: secondaryProfile.id,
    },
  });

  // Seed data for ShoppingList
  const shoppingList = await prisma.shoppingList.create({
    data: {
      roomId: room.id,
    },
  });

  // Seed data for ShoppingListItem
  const shoppingListItem = await prisma.shoppingListItem.create({
    data: {
      name: "Milk",
      type: "Dairy",
      status: "Needed",
      quantity: 2,
      shoppingListId: shoppingList.id,
      createdById: primaryProfile.id,
      assignedToId: secondaryProfile.id,
    },
  });

  // Seed data for Announcement
  const announcement = await prisma.announcement.create({
    data: {
      content: "Meeting at 5 PM in the common area.",
      status: "Active",
      roomId: room.id,
      sentById: adminProfile.id,
    },
  });

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
