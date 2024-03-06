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

    If it's not the first time you're running the project, you can also directly start the containers from Docker. 

5.  Run the database migrations to setup your database using Prisma.

    <br>

    ```bash
    npx prisma generate
    npx prisma migrate deploy
    npx prisma db seed
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
| Documentation      | http://localhost:3000/api-doc                           | API Documentation       |

There are three users you can use to log in:

- Admin: admin@example.com | test123
- Roommate 1: user_primary@example.com | test123
- Roommate 2: user_secondary@example.com | test123

### Common Issues

- `npx supabase start`
  - If you see any errors container the word `Docker`, make sure you have:
    1. Docker installed
    2. Docker running
    3. Gave enough time for Docker to get started
  - Once you know that Docker is fully ready, retry `npx supabase start`
 
- Supabase not accessible
   - You likely stopped your local supabase setup without using `supabase stop` and `supabase start` still shows it as running.
   - Execute `supabase stop` and then `supabase start` again. 

### Tips

- Use the local database interface to take a look at the database: http://127.0.0.1:54323

### Commands that can be used

- `npx prisma migrate dev --name {NAME}`: Run a migration
- `npx supabase db reset`: Reset the database.
- `npx supabase stop`: Stop the local Supabase setup.
