import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const { apiCall, isAdmin } = useAuth();
  const { showSuccess, showError } = useToast();

  const fetchContributors = async () => {
    try {
      const data = await apiCall('/api/contributors');
      setContributors(data.contributors);
    } catch (error) {
      showError('Failed to fetch contributors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchContributors();
    }
  }, [isAdmin]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setFormLoading(true);
    try {
      const data = await apiCall('/api/contributors/invite', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      
      showSuccess(`Invite sent to ${email}! Check the console for the invite link.`);
      console.log('🔗 Invite Link:', data.inviteLink);
      setEmail('');
      setShowForm(false);
    } catch (error) {
      showError(error.message || 'Failed to send invite');
    } finally {
      setFormLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Access Denied</h1>
          <p className="mt-2 text-slate-600">You need admin privileges to view this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Contributors</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : 'Invite Contributor'}
          </button>
        </div>

        {showForm && (
          <div className="card mb-6">
            <h2 className="text-lg font-medium text-slate-900 mb-4">Invite New Contributor</h2>
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`mt-1 input ${emailError ? 'border-red-300' : ''}`}
                  placeholder="Enter contributor's email"
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-600">{emailError}</p>
                )}
                <p className="mt-1 text-xs text-slate-500">
                  An invite link will be generated and logged to the console (mock email).
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={formLoading}
                  className={`btn btn-primary ${formLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {formLoading ? 'Sending Invite...' : 'Send Invite'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="card">
          {contributors.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">No contributors found. Invite your first contributor!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {contributors.map((contributor) => (
                    <tr key={contributor._id}>
                      <td className="font-medium">{contributor.name}</td>
                      <td>{contributor.email}</td>
                      <td>
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {contributor.role}
                        </span>
                      </td>
                      <td>{new Date(contributor.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contributors;