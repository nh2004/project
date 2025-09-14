import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
            </div>
            
            {isAdmin && (
              <div className="flex space-x-4">
                <Link
                  to="/projects"
                  className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Projects
                </Link>
                <Link
                  to="/contributors"
                  className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Contributors
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">
              Welcome, <span className="font-medium">{user.name}</span>
              {isAdmin && <span className="ml-1 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Admin</span>}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-secondary text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;