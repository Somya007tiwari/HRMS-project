# Human Resource Management System (HRMS)

A full-stack **Human Resource Management System (HRMS)** designed to streamline employee management and HR operations through a modern web application.

The project follows a **Modular Monolith** architecture with a clear separation between the frontend and backend, making the application easier to maintain, extend, and scale.

## ✨ Features

- 🔐 Secure user authentication
- 👥 Role-based access control
- 🧑‍💼 Employee management
- 📋 HR management workflows
- 📊 Role-specific application access
- 🔄 GraphQL-based API communication
- 🗄️ PostgreSQL database integration
- 🔑 JWT-based authentication
- 📱 Responsive user interface
- ⚡ Modern state management
- 🧩 Modular backend architecture

## 👥 User Roles

The system supports multiple user roles:

- **Employee** — Access employee-related functionality
- **HR Specialist** — Manage HR-related operations
- **Manager** — Access manager-specific functionality
- **Admin** — Manage administrative functionality

Access to application features is controlled according to the user's role and permissions.

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Context
- Zustand
- Apollo Client
- GraphQL

### Backend

- ASP.NET Core
- C#
- GraphQL
- Entity Framework Core
- PostgreSQL
- JWT Authentication

### Architecture & Tools

- Modular Monolith Architecture
- Clean Architecture
- Git
- GitHub
- Visual Studio Code

## 🏗️ Architecture

The project is organized into separate frontend and backend applications.

```text
PROPVIVO-project/
│
├── backend/
│   ├── API/
│   ├── Modules/
│   ├── Shared/
│   └── HRMSBoilerPlate.slnx
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── graphql/
│   ├── lib/
│   ├── public/
│   ├── store/
│   ├── stores/
│   └── middleware.ts
│
├── .gitignore
└── README.md
```

## 🔐 Authentication

The application uses **JWT-based authentication** to secure user access.

The authentication flow includes:

1. User logs in through the frontend.
2. Credentials are sent to the backend.
3. The backend validates the user.
4. An access token is generated.
5. The frontend stores the authentication state.
6. Protected routes are accessible only to authenticated users.
7. Role-based authorization controls access to specific functionality.

## 🔗 Frontend–Backend Communication

The frontend communicates with the ASP.NET Core backend using configured API and GraphQL endpoints.

**Apollo Client** is used on the frontend for GraphQL communication, while authentication information is attached to authorized requests.

## 🗄️ Database

The application uses **PostgreSQL** for persistent data storage.

**Entity Framework Core** is used in the backend for database access and data management.

## 📋 Prerequisites

Before running the project locally, make sure you have installed:

- Node.js
- npm
- .NET SDK
- PostgreSQL
- Git
- Visual Studio Code or Visual Studio

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Somya007tiwari/PROPVIVO-project.git
```

Move into the project directory:

```bash
cd PROPVIVO-project
```

### 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Restore the .NET dependencies:

```bash
dotnet restore
```

Build the backend:

```bash
dotnet build
```

Configure the required database connection and application settings according to your local environment.

Run the backend:

```bash
dotnet run
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Configure the required environment variables.

Example:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:<backend-port>
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:<graphql-port>/graphql
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:3000
```

## 🧪 Testing

Backend tests can be executed using:

```bash
dotnet test
```

Frontend checks and builds can be performed using the scripts available in `frontend/package.json`.

## 🏭 Production Build

### Frontend

Create a production build:

```bash
npm run build
```

Start the production application:

```bash
npm start
```

### Backend

Build the backend:

```bash
dotnet build --configuration Release
```

The backend can then be deployed using the hosting environment and configuration appropriate for the application.

## 🔒 Environment Variables & Security

Environment-specific configuration should be stored in environment files and should not expose sensitive information.

Do not commit the following to GitHub:

- Database passwords
- JWT secrets
- API keys
- Access tokens
- Other private credentials

Use `.env.example` or equivalent example configuration files to document required variables without exposing secrets.

## 📸 Screenshots

Screenshots of the application can be added here to demonstrate:

- Login page
- Employee dashboard
- HR dashboard
- Manager dashboard
- Admin dashboard
- Employee management
- Other major application features

Example:

```text
screenshots/
├── login.png
├── employee-dashboard.png
├── hr-dashboard.png
├── manager-dashboard.png
└── admin-dashboard.png
```

## 🚀 Deployment

The application can be deployed by hosting the frontend and backend separately or using an appropriate full-stack deployment architecture.

Before deployment:

1. Configure production environment variables.
2. Configure the production PostgreSQL database.
3. Update API and GraphQL URLs.
4. Build the frontend.
5. Build and publish the backend.
6. Configure authentication and security settings.
7. Verify frontend–backend communication.

## 📌 Project Status

The HRMS project is under active development, with additional features and improvements being added as the application evolves.

## 👩‍💻 Author

**Somya Tiwari**

B.Tech Computer Science Engineering
