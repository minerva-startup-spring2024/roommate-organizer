import { getProfile } from "../../_utils";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/buildings/updateprofile:
 *   post:
 *     summary: Create a new entry in the ProfileBuilding join table
 *     description: This endpoint is used to create a new entry in the ProfileBuilding join table, which represents the relationship between a profile and a building.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buildingId:
 *                 type: string
 *                 description: The ID of the building to associate with the profile.
 *             example:
 *               buildingId: "123456"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *             example:
 *               message: "Profile updated successfully"
 *       500:
 *         description: Failed to update profile with building
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                 error:
 *                   type: string
 *                   description: The error message.
 *             example:
 *               message: "Failed to update profile with building"
 *               error: "Internal server error"
 *   delete:
 *     summary: Delete a profile or building entry or both depending on user role
 *     description: This endpoint is used to delete a profile and building entry from the ProfileBuilding join table. It also deletes the associated building entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buildingId:
 *                 type: string
 *                 description: The ID of the building to delete.
 *             example:
 *               buildingId: "123456"
 *     responses:
 *       200:
 *         description: Profile and building deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *             example:
 *               message: "Profile and building deleted successfully"
 *       404:
 *         description: User does not have Profile with building
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *             example:
 *               message: "User does not have Profile with building"
 *       500:
 *         description: Failed to delete profile and building
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                 error:
 *                   type: string
 *                   description: The error message.
 *             example:
 *               message: "Failed to delete profile and building"
 *               error: "Internal server error"
 *   put:
 *     summary: Update a building entry
 *     description: This endpoint is used to update a building entry in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buildingId:
 *                 type: string
 *                 description: The ID of the building to update.
 *               name:
 *                 type: string
 *                 description: The new name of the building.
 *               address:
 *                 type: string
 *                 description: The new address of the building.
 *             example:
 *               buildingId: "123456"
 *               name: "New Building Name"
 *               address: "New Building Address"
 *     responses:
 *       200:
 *         description: Building updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 building:
 *                   type: object
 *                   description: The updated building object.
 *             example:
 *               message: "Building updated successfully"
 *               building: {
 *                 id: "123456",
 *                 name: "New Building Name",
 *                 address: "New Building Address"
 *               }
 *       401:
 *         description: Only MANAGER can update buildings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *             example:
 *               message: "Only MANAGER can update buildings"
 *       500:
 *         description: Failed to update building
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                 error:
 *                   type: string
 *                   description: The error message.
 *             example:
 *               message: "Failed to update building"
 *               error: "Internal server error"
 */

//creates ptofilebuilding which is a join table between profile and building
export async function POST(request, context) {
    const user = await getProfile();
    const { buildingId } = await request.json();

    try {
        // Check if the profileBuilding entry already exists
        const existingEntry = await prisma.profileBuilding.findUnique({
            where: {
                profileId_buildingId: {
                    profileId: user.id,
                    buildingId: buildingId,
                },
            },
        });

        if (existingEntry) {
            return NextResponse.json({ message: "Profile already updated with building" }, { status: 200 });
        }

        // Create a new entry in the ProfileBuilding join table
        const updateProfileBuilding = await prisma.profileBuilding.create({
            data: {
                profileId: user.id,
                buildingId: buildingId,
            },
        });

        return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Failed to update profile with building", error);
        return NextResponse.json({ message: "Failed to update profile with building:", error: error.message }, { status: 500 });
    }
}


export async function DELETE(request, context) {
    const user = await getProfile();
    const { buildingId } = await request.json();

    try {
        // Check if the profileBuilding entry exists
        const existingEntry = await prisma.profileBuilding.findUnique({
            where: {
                profileId_buildingId: {
                    profileId: user.id,
                    buildingId: buildingId,
                },
            },
        });

        if (!existingEntry) {
            return NextResponse.json({ message: "Use does not have Profile with building" }, { status: 404 });
        }

        // Delete the entry from the ProfileBuilding join table
        await prisma.profileBuilding.delete({
            where: {
                profileId_buildingId: {
                    profileId: user.id,
                    buildingId: buildingId,
                },
            },
        });

        if (user.role === "MANAGER"){

        // Delete the building entry
        await prisma.building.delete({
            where: {
                id: buildingId,
            },
        });
        }
        const successMessage = user.role === 'manager' 
            ? "Profile and building deleted successfully" 
            : "ProfileBuilding association deleted successfully";
        

        return NextResponse.json({ message: successMessage }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete ", error);
        const errorMessage = user.role === "MANAGER" 
            ? "Failed to delete profile and building:" 
            : "Failed to delete ProfileBuilding association:";
        return NextResponse.json({ message: errorMessage, error: error.message }, { status: 500 });
    }
}


export async function PUT(request) {
    // Destructure the required fields directly from the request payload
    const { buildingId, name, address } = await request.json();
    const user = await getProfile();

    if(user.role !== "MANAGER") {
        return NextResponse.json(
            { message: "Only MANAGER can update buildings" },
            { status: 401 }
        );
    }


    try {
      // Update the building entry using provided details
      const updatedBuilding = await prisma.building.update({
        where: { id: buildingId },
        data: {
          name: name,
          address: address,
        },
      });
  
      // Return success response with the updated building information
      return NextResponse.json(
        { message: "Building updated successfully", building: updatedBuilding },
        { status: 200 }
      );
    } catch (error) {
      console.error("Failed to update building", error);
      return NextResponse.json(
        { message: "Failed to update building", error: error.message },
        { status: 500 }
      );
    }
    }   
  