import { NextResponse } from "next/server";

import prisma from "@/../lib/db";
import { isAuthenticated } from "@/utils/authWrapper";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     tags:
 *       - Profiles
 *     summary: Create a new profile
 *     description: Creates a new profile linked to an auth user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                profileImage:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 profileImage:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

export async function POST(request, context) {
  const data = await request.json();
  try {
    const { user } = await isAuthenticated();

    const profile = await prisma.profile.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        profileImage: data.profileImage ? data.profileImage : null,
        userId: user.id,
      },
    });

    return NextResponse.json({ profile: profile }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating profile", error: error },
      { status: 500 }
    );
  }
}
