# Frontend - Admin Dashboard

React frontend with Tailwind CSS for the Admin Dashboard application.

## Features

- **Modern UI**: Clean, minimal design with Tailwind CSS
- **Authentication**: JWT cookie-based authentication
- **Role-based Routing**: Admin/Contributor access control
- **Responsive Design**: Works on all device sizes
- **Form Validation**: Client-side validation with error handling
- **Toast Notifications**: User feedback for actions
- **Loading States**: Proper loading indicators

## Pages

### Public Pages
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - New user registration
- **Accept Invite** (`/invite/:token`) - Contributor registration

### Protected Pages (Admin Only)
- **Projects** (`/projects`) - Project management dashboard
- **Contributors** (`/contributors`) - Team member management

## Components

- **Navbar** - Navigation with user info and logout
- **Loading** - Reusable loading spinner
- **ToastContainer** - Notification system
- **ProtectedRoute** - Route protection wrapper

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

5. Build for production:
   ```bash
   npm run build
   ```

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:4000
```

## Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Context** - State management

## Styling

The application uses a modern, minimal design with:
- Cool matte color palette (slate, indigo, teal)
- Clean cards and forms with rounded corners
- Subtle shadows and smooth transitions
- Responsive grid layouts
- Consistent spacing and typography
