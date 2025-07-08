# Dishcovery

Dishcovery is a simple web app for browsing, searching, and discovering recipes. It uses [TheMealDB API](https://www.themealdb.com/) to provide recipe data. The purpose of this app is to practice building a modern fullstack application with React and Node.js, featuring clean design and easy access to a variety of meal ideas.

## Demo

Here is a working live demo : [https://dishcovery-kmva.onrender.com](https://dishcovery-kmva.onrender.com)

![app-mockup](https://i.ibb.co/WNMmHCVq/Final.png)

## Technologies Used

- [Vite](https://vitejs.dev/guide/)
- [HeroUI](https://heroui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## Features

- Browse recipes by category, cuisine, or ingredient
- Search for recipes by name or keyword
- View detailed recipe instructions and ingredients
- Responsive design for desktop and mobile devices
- Favorite and save recipes for quick access
- Powered by TheMealDB API and MongoDB for user's data storage

## How to Use

### 1. Clone the Repository & install Dependencies

```bash
# Clone this repository
git clone https://github.com/Zetouny/Dishcovery.git

# Go into the repository
$ cd Dishcovery

# Install dependencies
$ npm install
```

### 2. Set Up MongoDB

This project uses MongoDB Atlas for data storage, here is how to setup yours:

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster and database
3. Whitelist your IP and create a database user/password
4. Create a table, and call it "users" (you can use any name you like)
5. Get your cluster connection string (something like `mongodb+srv://<username>:<password>@cluster0.mongodb.net/dishcovery?retryWrites=true&w=majority`)

### 3. Configure Environment Variables

Create a `.env` file in the root of your project, or use `.env.example` as a template:

```txt
PORT = (Choose a port to run the server on e.g. 3000)
TOKEN_KEY = (Add a key to be used for passwords encryption)
MONGODB_URL = (Add your cluster connection string from the previous step)
MONGODB_DB = (Add your database name)
MONGODB_USERS = (Add your "users" table name)
```

### 4. Run the development server

You'd need [concurrently](https://www.npmjs.com/package/concurrently) library if you would like to run both frontend and backend at the same time:

```bash
# first install the library if you don't have it
npm i -D concurrently

# then run dev
npm run dev
```

### 5. Building the app

If you changed in the frontend code, and you need to build it for deployment run the following code:

```bash
npm run build
```

After building is complete, you can use created `dist` folder to deploy the app

---

## Application Directory & Structure

```txt
Dishcovery/
├── index.html
├── cypress/
├── client/
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       └── ... (other frontend files)
└── server/
    ├── app.js
    ├── index.js
    └── ... (other backend files)
```

### Root Level

- `index.html`: The main HTML file loaded by browsers; it bootstraps the frontend app.
- `vite.config.ts`: Configuration file for Vite, the frontend build and dev server tool.
- `eslint.config.mjs`: Linting rules for maintaining code quality and style.
- `.prettierrc`: Configuration for code formatting using Prettier.

### `client/` (Frontend Source)

- `client/src/main.tsx`: Entry point for rendering the React app and wrapping it with context providers.
- `client/src/App.tsx`: The main React component where app routes are defined.
- `client/src/vite-env.d.ts`: TypeScript environment configuration for Vite.

The client folder contains the entire React frontend codebase, organized into components, pages, contexts, providers, and styles. It’s where all user interface and client-side logic lives.

### `server/` (Backend Source)

- `server/index.js`: Entry point for the backend; loads environment variables and starts the server.
- `server/app.js`: Configures and initializes the Express.js server, sets up API routes, middleware, and static file serving.

  The server folder contains all backend code, including route handlers for users and favorites (see imports in app.js), database setup (MongoDB), and static asset delivery.

### `cypress/` (E2E Testing)

The cypress folder contains all end to end tests. Feel free to edit/add your own testing code.

---

**That's it!**  
You can now explore, develop, and contribute to Dishcovery.
