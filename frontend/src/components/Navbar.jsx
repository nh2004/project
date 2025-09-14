import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUsers, FiFolder, FiUserCheck } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-lg border-b-4 border-indigo-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-black text-indigo-700 font-display">
                <Link to="/" className="hover:text-pink-500 transition-colors">
                  Admin Portal
                </Link>
              </h1>
            </div>

            {isAdmin && (
              <div className="flex space-x-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-x-2 text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold transition-transform transform hover:scale-105"
                >
                  <FiFolder className="h-5 w-5" />
                  Projects
                </Link>
                <Link
                  to="/contributors"
                  className="inline-flex items-center gap-x-2 text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold transition-transform transform hover:scale-105"
                >
                  <FiUsers className="h-5 w-5" />
                  Contributors
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-800">
                <span className="font-bold">{user.name}</span>
              </span>
              {isAdmin && (
                <span className="flex items-center ml-1 text-xs font-bold bg-pink-100 text-pink-700 px-3 py-1 rounded-full shadow-sm">
                  <FiUserCheck className="w-4 h-4 mr-1" />
                  Admin
                </span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-x-2 px-4 py-2 text-sm font-semibold rounded-full text-rose-600 border border-rose-600 hover:bg-rose-50 transition-colors"
            >
              <FiLogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;