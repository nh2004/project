# Admin Dashboard - Fullstack Web Application

A modern fullstack web application built with Node.js, Express, React, Tailwind CSS, and MongoDB. Features role-based authentication, project management, and contributor invitation system.

## 🚀 Features

- **Authentication System**
  - Email + password signup and login
  - First user automatically becomes Admin
  - JWT tokens stored in HTTP-only cookies
  - Role-based access control (Admin/Contributor)

- **Admin Dashboard**
  - Project management (create, view, status tracking)
  - Contributor management (invite, view team members)
  - Secure admin-only routes and operations

- **Invitation System**
  - Generate secure invite tokens for new contributors
  - Email-based invitations (mock email with console logging)
  - Token expiration and validation
  - Seamless contributor onboarding

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## 📁 Project Structure

```
project/
├── backend/                 # Express.js API server
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Auth & validation middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── server.js           # Entry point
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   └── App.jsx         # Main app component
│   ├── package.json        # Frontend dependencies
│   └── .env.example        # Frontend environment template
└── README.md               # This file
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas connection
- Git for version control

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   MONGO_URI
   JWT_SECRET=your-super-secret-jwt-key-here
   CLIENT_URL
   PORT
   NODE_ENV=development
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The backend will be available at `http://localhost:4000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:4000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## 🖥️ How to Run Locally

1. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

2. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on: `http://localhost:4000`

3. **Start the frontend application** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```
   Application runs on: `http://localhost:3000`

4. **Access the application:**
   - Open your browser to `http://localhost:3000`
   - Create your first account (becomes Admin automatically)
   - Start managing projects and inviting contributors!

## 📖 How to Use

### For Admins

1. **First Time Setup:**
   - Go to `http://localhost:3000`
   - Click "Create a new account"
   - Fill in your details - you'll automatically become the Admin

2. **Managing Projects:**
   - Navigate to the "Projects" page
   - Click "Add Project" to create new projects
   - View all projects in the table with status tracking

3. **Managing Contributors:**
   - Navigate to the "Contributors" page
   - Click "Invite Contributor" to send invitations
   - Enter the email address of the person you want to invite
   - The invite link will be logged to the console (mock email)

### For Contributors

1. **Accepting Invitations:**
   - Receive the invite link from an Admin
   - Click the link to access the registration form
   - Complete your profile with name and password
   - You'll be automatically logged in as a Contributor

2. **Access Levels:**
   - Contributors have limited access compared to Admins
   - Future features can be added based on role permissions

## 📧 Mock Email System

Since this is a development application, emails are not sent through a real email service. Instead:

- When an Admin sends an invite, the invite link is logged to the backend console
- In production, you would integrate with services like SendGrid, Mailgun, or AWS SES
- The invite link format: `http://localhost:3000/invite/{token}`

**Example console output:**
```
📧 MOCK EMAIL - Invite Link:
To: contributor@example.com
Link: http://localhost:3000/invite/abc123def456...
(In production, this would be sent via email)
```

## 🔒 Security Features

- **Password Security:** Passwords are hashed using bcryptjs
- **JWT Authentication:** Secure token-based authentication
- **HTTP-Only Cookies:** Tokens stored securely in HTTP-only cookies
- **CORS Protection:** Configured for specific origins
- **Role-Based Access:** Admin-only routes and operations
- **Input Validation:** Server-side validation for all inputs
- **Token Expiration:** Invite tokens expire after 7 days

## 🚀 Deployment Options

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Backend (Render/Heroku)
1. Create a new web service
2. Connect your GitHub repository
3. Set environment variables
4. Deploy with automatic builds

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Set up a new cluster
3. Get connection string
4. Update `MONGO_URI` in your environment variables

## 🔧 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/admin_app
JWT_SECRET=supersecretjwt
CLIENT_URL=http://localhost:3000
PORT=4000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:4000
```

## 📊 API Endpoints

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the package.json files for details.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running locally or check your Atlas connection string
   - Verify the `MONGO_URI` in your `.env` file

2. **CORS Errors:**
   - Check that `CLIENT_URL` in backend `.env` matches your frontend URL
   - Ensure both servers are running on the correct ports

3. **Build Errors:**
   - Delete `node_modules` and run `npm install` again
   - Ensure all environment variables are set correctly

4. **Authentication Issues:**
   - Clear browser cookies and try again
   - Check that `JWT_SECRET` is set in backend `.env`

### Getting Help

If you encounter any issues:
1. Check the console logs in both browser and terminal
2. Verify all environment variables are correctly set
3. Ensure both backend and frontend servers are running
4. Check MongoDB connection status

---

