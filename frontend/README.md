# HRMS Frontend

The frontend of the Human Resource Management System (HRMS) is built with **Next.js, React, and TypeScript**. It provides the user interface for authentication, employee-related operations, HR workflows, and role-based access.

## 🛠️ Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Context
- Zustand
- Apollo Client
- GraphQL
- JWT Authentication

## 📁 Project Structure

```text
frontend/
├── app/
├── components/
├── context/
├── graphql/
├── lib/
├── public/
├── store/
├── stores/
├── middleware.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

### `app/`

Contains application pages, layouts, and routes.

### `components/`

Contains reusable UI components.

### `context/`

Contains React Context providers used across the application.

### `graphql/`

Contains GraphQL queries, mutations, and related configuration.

### `lib/`

Contains reusable application utilities and authentication services.

### `store/`

Contains Redux Toolkit store configuration and application state.

### `stores/`

Contains Zustand stores used for UI and other client-side state.

### `middleware.ts`

Handles route protection and redirects unauthenticated users to the login page.

## 🔐 Authentication

The frontend implements an authentication flow using JWT tokens.

The authentication system includes:

- Login
- Token storage
- Protected routes
- Role-based access
- Authorization headers
- Authentication middleware
- Token refresh handling

## ⚙️ Environment Variables

Create the required environment file in the frontend directory.

Example:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:<backend-port>
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:<graphql-port>/graphql
```

Use the actual ports configured in your backend environment.

> Do not commit secret keys, tokens, passwords, or other sensitive credentials to GitHub.

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git
- Backend API running locally

### Install Dependencies

From the `frontend` directory:

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:3000
```

Open the URL in your browser to access the application.

## 🏗️ Build for Production

Create a production build using:

```bash
npm run build
```

Start the production server with:

```bash
npm start
```

## 🔗 Backend Integration

The frontend communicates with the ASP.NET Core backend through configured API and GraphQL endpoints.

Apollo Client is used for GraphQL communication and handles authentication-related headers and errors.

## 📌 Development Notes

- Keep environment-specific configuration in environment files.
- Do not commit sensitive credentials.
- Follow the existing component and folder structure when adding features.
- Reuse existing components and state-management patterns where possible.

## 👩‍💻 Author

**Somya Tiwari**

B.Tech Computer Science Engineering
