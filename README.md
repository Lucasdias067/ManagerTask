# Manager Task API

A RESTful API for managing tasks, built with Node.js, Express, and Prisma.

## Features

- **Task Management**: Create, read, update, and delete tasks.
- **User Authentication**: Secure user registration and login.
- **Database Integration**: Utilizes Prisma for database operations.

## Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- [Docker](https://www.docker.com/) (for containerized database setup)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Lucasdias067/manager-task-api.git
   cd manager-task-api

Install dependencies:

    npm install

Set up the database:
  
  If using Docker, start the database container:
    
    docker-compose up -d

  If not using Docker, ensure you have a PostgreSQL database running and update the DATABASE_URL in the .env file accordingly.

Run database migrations:

    npx prisma migrate dev

Start the server:

    npm run dev
The API will be accessible at http://localhost:3000.
