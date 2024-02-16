# API Development with Next.js and Prisma

Core concepts:

- `Prisma` is our ORM and the interface to our database. To get any data from the database we have to go through Prisma. You can import the Prisma client like this:

```javascript
import prisma from "../../../../lib/db";
```

- `NextResponse` is the class for creating a response for the frontend. Always wrap your response in a `NextResponse` like this:

```javascript
import { NextResponse } from "next/server";

// NextResponse
// First param: actual response object, can be any type of JSON
// Second param: response status
return NextResponse.json(
  { message: "Hello world.", helloWorld: { what: "hi", where: "world" } },
  { status: 200 }
);
```

- APIs and Routes are represented as folders in NextJS: `/api/[endpoint]`. For each endpoint, generate a new folder and add a `route.js` – this is where you define the logic for all allowed methods.

Example POST endpoint logic

```javascript
import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request, context) {
  // Getting the body from the request, needs to use await because it awaits the response
  const choreData = await request.json();

  // Interfacing with Prisma to create
  // Using try / catch logic to handle errors
  try {
    // Look up all the Prisma models in the prisme/schema.prisma file for reference
    // Look up all the methods to read / create / update data here: https://playground.prisma.io/examples/reading/find/find-all

    // Needs to use await because we are talking to the database and need to know from the database where it was successful
    const createChore = await prisma.choreListItem.create({
      // The data needed to create an element, reference the prisme/schema.prisma for all files that are required and optional (noted with a `?`)
      data: {
        id: uuidv4(),
        choreListId: choreData.choreListId,
        addedById: choreData.addedById,
        name: choreData.name,
        description: choreData.description,
      },
    });

    return NextResponse.json(
      { message: "Created chore", chore: createChore },
      // Success status
      { status: 200 }
    );

    // Catching errors
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create chore", error: error.message },
      // Error status
      { status: 500 }
    );
  }
}
```

Example GET endpoint logic

```javascript
import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    // Interfacing with Prisma to fetch data
    const chores = await prisma.choreListItem.findMany();

    return NextResponse.json(
      { message: "Fetched chores", chores },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch chores", error: error.message },
      { status: 500 }
    );
  }
}
```
