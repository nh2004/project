import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

const AcceptInvite = () => {
  const { token } = useParams();
  const [inviteData, setInviteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { apiCall, signupWithInvite } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const validateInvite = async () => {
    try {
      const data = await apiCall(`/api/contributors/accept/${token}`);
      setInviteData(data.invite);
    } catch (error) {
      showError(error.message || 'Invalid or expired invite');
      setTimeout(() => navigate('/login'), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      validateInvite();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setFormLoading(true);
    try {
      await signupWithInvite(token, formData.name, formData.password);
      showSuccess('Account created successfully! Welcome to the team!');
      navigate('/projects');
    } catch (error) {
      showError(error.message || 'Failed to create account');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Validating invite...</p>
        </div>
      </div>
    );
  }

  if (!inviteData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Invalid Invite</h1>
          <p className="mt-2 text-slate-600">This invite link is invalid or has expired.</p>
          <p className="mt-2 text-sm text-slate-500">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-slate-900">
            Accept Invitation
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            You've been invited to join as a contributor
          </p>
          <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-700">
              <strong>Email:</strong> {inviteData.email}
            </p>
            <p className="text-xs text-indigo-600 mt-1">
              Complete your registration below to get started.
            </p>
          </div>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 input ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 input ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 input ${errors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={formLoading}
              className={`group relative w-full flex justify-center btn btn-primary ${
                formLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {formLoading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcceptInvite;