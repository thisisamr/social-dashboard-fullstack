## Getting Started localy

### Before you begin

Make sure you have a postgres instance running locally or in the cloud.

### Step 1

Prepare a
<svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.625 1.99609H2.25C1.91848 1.99609 1.60054 2.12252 1.36612 2.34757C1.1317 2.57261 1 2.87783 1 3.19609V12.7961C1 13.1144 1.1317 13.4196 1.36612 13.6446C1.60054 13.8697 1.91848 13.9961 2.25 13.9961H9.75C10.0815 13.9961 10.3995 13.8697 10.6339 13.6446C10.8683 13.4196 11 13.1144 11 12.7961V6.19609L6.625 1.99609Z" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 1.99609V7.99609H11" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg> .env file for Prisma.

For more info check out prisma 👍 [Prisma.io](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres)

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
TOKENSECRET="mysupersecrettoken"

```

### Step 2

Install dependancies run:

```bash
npm i
# or
yarn
```

### Step 3

Migrate your database schema to postgres run:

```bash
npx prisma migrate dev
# or
```

### Step 4

run the development server:

```bash
npm run dev
# or
yarn dev
```

🙋 cheers i hope it worked for you.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Check out the live Version

[Awesome-dash](https://social-dashboard-fullstack.vercel.app/) ⚡

<img src="./public/social-dash.png" style="width:400px;height:300px;object-fit:cover;">

## Stack

- Nextjs
- TypeScript
- Chackra UI
- prisma
- postgres

## Project structure

```
$PROJECT_ROOT
│   # Page files
├── pages
│   # React component files
├── components
│   # Non-react modules
├── lib
│   # Static files for images and 3d model file
└── public
```
