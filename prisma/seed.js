const { PrismaClient } = require("@prisma/client");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const prisma = new PrismaClient();

async function bucketExists(bucketId) {
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error("Error listing buckets:", error);
    return false;
  }
  return data.some((bucket) => bucket.id === bucketId);
}

async function ensureBucketExists(bucketId, options = { public: false }) {
  const exists = await bucketExists(bucketId);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(bucketId, options);
    if (error) {
      console.error(`Failed to create bucket "${bucketId}":`, error);
      throw error;
    }
    console.log(`Bucket "${bucketId}" created successfully.`);
  }
}

async function uploadWithRetry(bucketId, filePath, fileBuffer, retryCount = 3) {
  let lastError;

  for (let attempt = 1; attempt <= retryCount; attempt++) {
    try {
      const { data, error } = await supabase.storage
        .from(bucketId)
        .upload(filePath, fileBuffer, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (error) throw error;
      console.log(`Successfully uploaded "${filePath}" on attempt ${attempt}.`);
      return data;
    } catch (error) {
      console.error(
        `Attempt ${attempt} to upload "${filePath}" failed:`,
        error.message
      );
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }

  console.error(`All attempts to upload "${filePath}" have failed.`);
  throw lastError;
}

async function seedSupabaseStorage(supabase) {
  const uploadedFiles = [];
  const bucketId = "avatars";
  await ensureBucketExists(bucketId, { public: true });

  // Specify your directory and file handling logic here
  const seedImagesDirectory = "assets/seed-images";
  const filesToUpload = fs.readdirSync(seedImagesDirectory);

  for (const fileName of filesToUpload) {
    const filePath = path.join(seedImagesDirectory, fileName);
    const fileBuffer = fs.readFileSync(filePath);
    // Customize the unique file path as needed
    const uniqueFilePath = `${fileName}`;
    await uploadWithRetry(bucketId, uniqueFilePath, fileBuffer);
    uploadedFiles.push(uniqueFilePath);
  }

  return uploadedFiles;
}

async function main() {
  const uploadedImagePaths = await seedSupabaseStorage().catch(console.error);

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
      id: "081af0a8-6dbf-47d0-9a15-4c4573e9e131",
      firstName: "Primary",
      lastName: "Roommate",
      role: "ROOMMATE",
      userId: primaryUser.data.user.id,
      profileImage: uploadedImagePaths[0],
    },
  });

  const secondaryProfile = await prisma.profile.create({
    data: {
      id: "8102289a-09e4-4b48-9bd3-f0adbc174e8e",
      firstName: "Secondary",
      lastName: "Roommate",
      role: "ROOMMATE",
      userId: secondaryUser.data.user.id,
      profileImage: uploadedImagePaths[1],
    },
  });

  const adminProfile = await prisma.profile.create({
    data: {
      id: "ed13b501-404c-4749-b40c-660e8d73faea",
      firstName: "Minerva",
      lastName: "Manager",
      role: "MANAGER",
      profileImage:
        "https://upload.wikimedia.org/wikipedia/commons/f/fb/Minerva_Logo_cntr_blk.png",
      userId: adminUser.data.user.id,
      profileImage: uploadedImagePaths[2],
    },
  });

  // Seed data for Building
  // const building = await prisma.building.create({
  //   data: {
  //     id: "6f99bc66-32ab-4c25-aea2-e0108bc1da3e",
  //     name: "SF Residence Hall",
  //     address: "16 Turk St",
  //     metadata: { floors: 5 },
  //     members: {
  //       connect: [
  //         { id: adminProfile.id },
  //         { id: primaryProfile.id },
  //         { id: secondaryProfile.id },
  //       ],
  //     },
  //   },
  // });

  // Seed data for Room
  const room = await prisma.room.create({
    data: {
      id: "3b432163-fd3d-47b7-8b1b-9f7dfaa57f34",
      name: "101",
      members: {
        connect: [{ id: primaryProfile.id }, { id: secondaryProfile.id }],
      },
    },
  });

  // Seed data for ChoreList
  const choreList = await prisma.choreList.create({
    data: {
      id: "a06b4a14-27b9-4285-802b-1464aa8d1969",
      roomId: room.id,
    },
  });

  // Seed data for ChoreListItem
  const choreListItem = await prisma.choreListItem.create({
    data: {
      id: "6be969cf-ca8d-4eea-811a-c42c38720fa0",
      name: "Take out trash",
      type: "Weekly",
      choreListId: choreList.id,
      createdById: primaryProfile.id,
      assignedToId: secondaryProfile.id,
    },
  });

  // Seed data for ShoppingList
  const shoppingList = await prisma.shoppingList.create({
    data: {
      id: "ab1cf2c5-4a1e-4e08-a757-288060e6d9f3",
      roomId: room.id,
    },
  });

  // Seed data for ShoppingListItem
  const shoppingListItem = await prisma.shoppingListItem.create({
    data: {
      id: "c28a5103-cb36-4a77-8172-0402284e64e3",
      name: "Milk",
      type: "Dairy",
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
