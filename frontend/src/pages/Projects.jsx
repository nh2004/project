import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    language: '',
    status: 'active',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { apiCall, isAdmin } = useAuth();
  const { showSuccess, showError } = useToast();

  const fetchProjects = async () => {
    try {
      const data = await apiCall('/api/projects');
      setProjects(data.projects);
    } catch (error) {
      showError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchProjects();
    }
  }, [isAdmin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Project name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.language.trim()) errors.language = 'Programming language is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormLoading(true);
    try {
      await apiCall('/api/projects', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      
      showSuccess('Project created successfully!');
      setFormData({ name: '', description: '', language: '', status: 'active' });
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      showError(error.message || 'Failed to create project');
    } finally {
      setFormLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-teal-100 text-teal-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
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
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : 'Add Project'}
          </button>
        </div>

        {showForm && (
          <div className="card mb-6">
            <h2 className="text-lg font-medium text-slate-900 mb-4">Create New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`mt-1 input ${formErrors.name ? 'border-red-300' : ''}`}
                    placeholder="Enter project name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-slate-700">
                    Programming Language
                  </label>
                  <input
                    type="text"
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className={`mt-1 input ${formErrors.language ? 'border-red-300' : ''}`}
                    placeholder="e.g., JavaScript, Python, Java"
                  />
                  {formErrors.language && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.language}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`mt-1 input ${formErrors.description ? 'border-red-300' : ''}`}
                  placeholder="Enter project description"
                />
                {formErrors.description && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                )}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-slate-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 input"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={formLoading}
                  className={`btn btn-primary ${formLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {formLoading ? 'Creating...' : 'Create Project'}
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
          {projects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">No projects found. Create your first project!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Language</th>
                    <th>Status</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {projects.map((project) => (
                    <tr key={project._id}>
                      <td className="font-medium">{project.name}</td>
                      <td className="max-w-xs truncate">{project.description}</td>
                      <td>{project.language}</td>
                      <td>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td>{new Date(project.createdAt).toLocaleDateString()}</td>
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

export default Projects;