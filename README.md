### Getting Started

1. Install all of the dependencies as listed in the `package.json` file:

   <br>

   ```bash
   npm install
   ```

<br>

2.  Install Docker for your local setup. We use Docker to manage your local Supabase database setup: https://docs.docker.com/get-docker/.
    <br>

3.  Rename the `.env.local` file to just `.env`.
    <br>

4.  Start the local Supabase instance. This may take some time and requires you to have Docker installed with enough storage to download all the required Docker images.
    <br>

    ```bash
    npx supabase start
    ```

    <br>

5.  Run the database migrations to setup your database using Prisma.

    <br>

    ```bash
    npx prisma generate
    npx prisma migrate deploy
    ```

    <br>

6.  Start the application.

    <br>

    ```bash
    npm run dev
    ```

    <br>

There are now multiple services running:

| Service            | URL                                                     | Description                  |
| ------------------ | ------------------------------------------------------- | ---------------------------- |
| App                | http://localhost:3000                                   | Main application.            |
| Database Interface | http://127.0.0.1:54323                                  | Supabase database interface. |
| Database           | postgresql://postgres:postgres@127.0.0.1:54322/postgres | Database URL                 |

There are three users you can use to log in:

- Admin: admin@example.com | test123
- Roommate 1: user_primary@example.com | test123
- Roommate 2: user_secondary@example.com | test123

### Tips

- Use the local database interface to take a look at the database: http://127.0.0.1:54323

### Commands that can be used

- `npx prisma migrate dev --name {NAME}`: Run a migration
- `npx supabase stop`: Stop the local Supabase setup.
