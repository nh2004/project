# Backend - Admin Dashboard API

Express.js backend with MongoDB for the Admin Dashboard application.

## Features

- **Authentication**: JWT tokens in HTTP-only cookies
- **Role-based Access**: Admin/Contributor permissions
- **Project Management**: CRUD operations for projects
- **Invitation System**: Token-based contributor invites
- **Security**: Password hashing, CORS protection, input validation

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout
- `POST /api/auth/signup/:token` - Contributor signup with invite

### Projects (Admin Only)
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project

### Contributors (Admin Only)
- `GET /api/contributors` - List all contributors
- `POST /api/contributors/invite` - Send invitation
- `GET /api/contributors/accept/:token` - Validate invite token

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment file:
   ```bash
   cp .env.example .env
   ```

3. Configure environment variables in `.env`

4. Start development server:
   ```bash
   npm run dev
   ```

## Environment Variables

```env
MONGO_URI=mongodb://localhost:27017/admin_app
JWT_SECRET=supersecretjwt
CLIENT_URL=http://localhost:3000
PORT=4000
NODE_ENV=development
```

## Database Models

### User
- id, name, email, passwordHash, role (admin|contributor), createdAt

### Project
- id, name, description, language, status, createdAt

### Invite
- id, email, token, status (pending|accepted), expiry, createdAt