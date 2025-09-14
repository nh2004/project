import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin, logout } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-6 py-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="mt-2 text-gray-600">
            You need <span className="font-semibold">admin privileges</span> to view this page.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Further access details will be communicated via <span className="font-medium">email</span>.
          </p>

          <button
            onClick={logout}
            className="mt-6 inline-block bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-indigo-500 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;