# Roommate Organizer

Welcome to the project!

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Local Setup](#local-setup)
    - [Common Issues](#common-issues)
    - [Tips](#tips)
    - [Commands that can be used](#commands-that-can-be-used)
- [How to run the app (if this is not your first time running it locally)](#how-to-run-the-app-if-this-is-not-your-first-time-running-it-locally)
- [How to do a database migration](#how-to-do-a-database-migration)
- [Deployment](#deployment)

## Getting Started

#### Installation

1. Install all of the dependencies as listed in the `package.json` file:
   ```bash
   npm install
   ```
    <br>
2. Install Docker for your local setup. We use Docker to manage your local Supabase database setup: https://docs.docker.com/get-docker/.
   <br>
3. Rename the `.env.local` file to just `.env`.
   <br>
4. Start the local Supabase instance. This may take some time and requires you to have Docker installed with enough storage to download all the required Docker images.
   ```bash
   npx supabase start
   ```
   If it's not the first time you're running the project, you can also directly start the containers from Docker.
   <br>
5. Run the database migrations to set up your database using Prisma.
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   npx prisma db seed
   ```
   <br>
6. Start the application.
   ```bash
   npm run dev
   ```

---

#### Local Setup

There are now multiple services running:

| Service            | URL                                                     | Description                  |
| ------------------ | ------------------------------------------------------- | ---------------------------- |
| App                | http://localhost:3000                                   | Main application.            |
| Database Interface | http://127.0.0.1:54323                                  | Supabase database interface. |
| Database           | postgresql://postgres:postgres@127.0.0.1:54322/postgres | Database URL                 |
| Documentation      | http://localhost:3000/api-doc                           | API Documentation            |

There are three users you can use to log in:

- Admin: admin@example.com | test123
- Roommate 1: user_primary@example.com | test123
- Roommate 2: user_secondary@example.com | test123

#### Common Issues

- If you see any errors container the word `Docker`, make sure you have:

  1. Docker installed
  2. Docker running
  3. Gave enough time for Docker to get started
  4. Once you know that Docker is fully ready, retry `npx supabase start`
     <br>

- Supabase not accessible

  - You likely stopped your local supabase setup without using `supabase stop` and `supabase start` still shows it as running.
  - Execute `supabase stop` and then `supabase start` again.
  - Or simply run the database containers from the Docker Desktop UI.
    <br>

- An error occurred while running the seed command. **Error: Command failed with exit code 1: node prisma/seed.js**

  - The database may already be partially populated with some data and the seed is unable to proceed.
  - Stop the app. Stop the Supabase Docker containers by opening the Docker Desktop, selecting the containers, and clicking on Stop.
  - Execute `npx supabase db reset` to reset the database.
  - Then start the database containers and run the app (You can go to the "How to run the app (if this is not your first time running it locally)" section and start from step 3.
    <br>

- **ENVIRONMENT VARIABLE NOT FOUND**
  - You need a .env file.
  - Refer to step 2 from the "Getting Started" section.

#### Tips

- Use the local database interface to take a look at the database: http://127.0.0.1:54323

#### Commands that can be used

- `npx prisma migrate dev --name {NAME}`: Run a migration
- `npx supabase db reset`: Reset the database.
- `npx supabase stop`: Stop the local Supabase setup.

---

## How to run the app (if this is not your first time running it locally)

This is very similar to the Get Started section but with some clarifications.

1. Install all of the dependencies as listed in the `package.json` file:
   ```bash
   npm install
   ```
   <br>
2. Start supabase:
   - Option 1: Using `supabase` commands
     ```bash
     npx supabase start
     ```
     <br>
   - Option 2: Manually in Docker
     1. Open Docker Desktop.
     2. Select all supabase containers and start them.
        <br>
3. Ensure database is up-to-date:
   1. Reset the database
      ```bash
      npx supabase db reset
      ```
      <br>
   2. Run all migrations
      ```bash
      npx prisma generate
      npx prisma migrate deploy
      npx prisma db seed
      ```
      <br>
4. Start the application.
   ```bash
   npm run dev
   ```

---

## How to do a database migration

#### Important notes

- Migrations in the local Prisma folder are the source of truth.
- Running `npx prisma migrate dev` creates a new migration **and** applies it to the database.
- Running `npx migrate deploy` only deploys the migration (this is what we do when we merge into prod). **This is the only command you should be using if you don't touch backend.**
- When these are out of sync we have a problem 😄 then we just have to reset the db and apply all the migrations from the folder with deploy again. This means that all data in the database will be lost!

### Database migration steps

Before doing any coding, it's good to discuss with the team before you make database changes so that you're sure they make sense and the team has an aligned vision.

1. Run the app locally.
   <br>
2. Open the local database interface at http://127.0.0.1:54323.
   <br>
3. Do the changes you need to do in the database.
   <br>
4. Once you're done, pull the schema (update the local Prisma schema file).
   ```bash
   npx prisma db pull --schema [PATH TO YOUR /prisma/schema.prisma file]
   ```
   <br>
5. Create a new migration
   ```bash
   npx prisma migrate dev --name [A NAME OF THE NEW MIGRATION]
   ```
    <br>
6. Test it locally.
   - Run the Prisma generate and migrate commands and run the app locally.
   - Make sure the changes were not breaking and the database would be migrated successfully.
     <br>
7. Create the PR. Wait for a review. Once the PR is approved, apply the changes to the production database.
   ```bash
   npx prisma migrate deploy
   ```

---

## Deployment

There is a staging branch which is the default branch. All PRs will be merged into staging. Ba Thien will deploy to production when we have major updates that have been stable so that we always have a stable prod version that can be used by users. In the real world, we would release versions + features periodically.

We are using Vercel for the deployment.
