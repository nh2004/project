import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useToast } from './hooks/useToast';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';
import ToastContainer from './components/ToastContainer';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Projects from './pages/Projects';
import Contributors from './pages/Contributors';
import AcceptInvite from './pages/AcceptInvite';

// Layout component that includes navbar
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

// App content that needs auth context
const AppContent = () => {
  const { user, loading } = useAuth();
  const { toasts, removeToast } = useToast();

  if (loading) {
    return <Loading text="Loading application..." />;
  }

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/projects" replace />} 
        />
        <Route 
          path="/signup" 
          element={!user ? <Signup /> : <Navigate to="/projects" replace />} 
        />
        <Route path="/invite/:token" element={<AcceptInvite />} />

        {/* Protected routes */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute requireAdmin={true}>
              <Layout>
                <Projects />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contributors"
          element={
            <ProtectedRoute requireAdmin={true}>
              <Layout>
                <Contributors />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route 
          path="/" 
          element={<Navigate to={user ? "/projects" : "/login"} replace />} 
        />
        
        {/* Catch all route */}
        <Route 
          path="*" 
          element={<Navigate to={user ? "/projects" : "/login"} replace />} 
        />
      </Routes>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
