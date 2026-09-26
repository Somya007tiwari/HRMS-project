# HRMS Backend

The backend of the Human Resource Management System (HRMS) is built using **ASP.NET Core** and follows a modular architecture to provide secure and scalable APIs for managing employees, HR operations, authentication, and other HR-related functionalities.

## 🛠️ Tech Stack

- ASP.NET Core
- C#
- GraphQL
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- Clean Architecture
- Modular Monolith Architecture

## 📁 Project Structure

```text
backend/
├── API/
├── Modules/
├── Shared/
├── HRMSBoilerPlate.slnx
└── .gitignore
```

### API

Contains the application entry point and API configuration.

### Modules

Contains separate business modules and their related functionality.

### Shared

Contains common functionality shared across different modules.

## 🔐 Authentication

The application uses **JWT-based authentication** to securely authenticate users and authorize access to protected resources.

Different user roles can access functionality according to their permissions:

- Employee
- HR Specialist
- Manager
- Admin

## 🗄️ Database

The backend uses **PostgreSQL** as the database and **Entity Framework Core** for database access and data management.

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- .NET SDK
- PostgreSQL
- Visual Studio or Visual Studio Code
- Git

### Clone the Repository

```bash
git clone <your-repository-url>
cd HRMS/backend
```

### Configure the Application

Update the database connection string and other required settings in the application's configuration/environment files.

### Restore Dependencies

```bash
dotnet restore
```

### Build the Project

```bash
dotnet build
```

### Run the Backend

```bash
dotnet run
```

The API will start on the configured local development port.

## 🧪 Testing

Run the available tests using:

```bash
dotnet test
```

## 🔗 API

The backend exposes APIs used by the HRMS frontend for authentication, employee management, HR operations, and other application functionality.

GraphQL endpoints can be configured according to the application's environment settings.

## 📌 Development Notes

- Keep secrets and database credentials out of source control.
- Use environment-specific configuration for local and production environments.
- Follow the existing modular architecture when adding new features.
- Keep business logic separated from API and infrastructure concerns.

## 👩‍💻 Author

**Somya Tiwari**

B.Tech Computer Science Engineering
