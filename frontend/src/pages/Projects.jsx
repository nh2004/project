import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';
import {
  FiPlus,
  FiChevronDown,
  FiEdit,
  FiTrash2,
  FiEye,
} from 'react-icons/fi';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    language: '',
    status: 'active',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Filters
  const [filters, setFilters] = useState({ search: '', status: 'all', language: 'all' });

  // Modals
  const [deleteId, setDeleteId] = useState(null);
  const [viewProject, setViewProject] = useState(null);

  const { apiCall, isAdmin } = useAuth();
  const { showSuccess, showError } = useToast();

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const data = await apiCall('/api/projects');
      setProjects(data.projects);
    } catch {
      showError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (isAdmin) fetchProjects(); }, [isAdmin]);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (formErrors[name]) setFormErrors((p) => ({ ...p, [name]: '' }));
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
    if (Object.keys(errors).length) { setFormErrors(errors); return; }
    setFormLoading(true);
    try {
      if (isEditing && editingId) {
        await apiCall(`/api/projects/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        showSuccess('Project updated');
      } else {
        await apiCall('/api/projects', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        showSuccess('Project created');
      }
      setFormData({ name: '', description: '', language: '', status: 'active' });
      setShowForm(false); setIsEditing(false); setEditingId(null);
      fetchProjects();
    } catch (err) { showError(err.message || 'Request failed'); }
    finally { setFormLoading(false); }
  };

  const handleEdit = (p) => {
    setFormData({ name: p.name, description: p.description, language: p.language, status: p.status });
    setEditingId(p._id); setIsEditing(true); setShowForm(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await apiCall(`/api/projects/${deleteId}`, { method: 'DELETE' });
      showSuccess('Project deleted');
      setDeleteId(null); fetchProjects();
    } catch (err) { showError(err.message || 'Delete failed'); }
  };

  const getStatusColor = (s) => ({
    active: 'bg-blue-200 text-blue-900',
    completed: 'bg-emerald-200 text-emerald-900',
    'on-hold': 'bg-amber-200 text-amber-900',
    cancelled: 'bg-rose-200 text-rose-900',
  }[s] || 'bg-gray-200 text-gray-900');

  // Apply filters client-side
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      !filters.search ||
      p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || p.status === filters.status;
    const matchesLang = filters.language === 'all' || p.language.toLowerCase() === filters.language.toLowerCase();
    return matchesSearch && matchesStatus && matchesLang;
  });

  const uniqueLanguages = [...new Set(projects.map((p) => p.language))];

  if (!isAdmin) return <div className="p-12 text-center text-red-600 font-bold">❌ Access Denied</div>;
  if (loading) return <div className="p-12 text-center text-indigo-600">Loading…</div>;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Projects</h1>
        <button
          onClick={() => { setShowForm(!showForm); setIsEditing(false); setEditingId(null); setFormData({ name: '', description: '', language: '', status: 'active' }); }}
          className="bg-indigo-600 text-white px-5 py-2 rounded-full flex items-center gap-2"
        >
          {showForm ? 'Cancel' : 'Add Project'} <FiPlus />
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-8 space-y-4">
          <h2 className="text-lg font-bold">{isEditing ? 'Edit Project' : 'Create Project'}</h2>
          <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="w-full border p-2 rounded" />
          <input name="language" value={formData.language} onChange={handleInputChange} placeholder="Language" className="w-full border p-2 rounded" />
          <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" rows={3} className="w-full border p-2 rounded" />
          <select name="status" value={formData.status} onChange={handleInputChange} className="w-full border p-2 rounded">
            <option value="active">Active</option><option value="completed">Completed</option>
            <option value="on-hold">On Hold</option><option value="cancelled">Cancelled</option>
          </select>
          <button type="submit" disabled={formLoading} className="bg-indigo-600 text-white px-4 py-2 rounded">
            {formLoading ? (isEditing ? 'Updating…' : 'Creating…') : (isEditing ? 'Update Project' : 'Create Project')}
          </button>
        </form>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 gap-4 bg-white p-5 rounded-xl shadow">
        <div className="flex-1">
          <label className="block text-sm font-medium">Search</label>
          <input type="text" value={filters.search} onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))} placeholder="Name or description" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))} className="border px-3 py-2 rounded w-40">
            <option value="all">All</option><option value="active">Active</option>
            <option value="completed">Completed</option><option value="on-hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Language</label>
          <select value={filters.language} onChange={(e) => setFilters((f) => ({ ...f, language: e.target.value }))} className="border px-3 py-2 rounded w-40">
            <option value="all">All</option>
            {uniqueLanguages.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Language</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Created</th>
              <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold">{p.name}</td>
                <td className="px-6 py-3 max-w-xs truncate">{p.description}</td>
                <td className="px-6 py-3">{p.language}</td>
                <td className="px-6 py-3"><span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(p.status)}`}>{p.status}</span></td>
                <td className="px-6 py-3 text-sm text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-3 text-right flex justify-end gap-2">
                  <button onClick={() => setViewProject(p)} className="text-blue-600"><FiEye /></button>
                  <button onClick={() => handleEdit(p)} className="text-indigo-600"><FiEdit /></button>
                  <button onClick={() => setDeleteId(p._id)} className="text-red-600"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h2 className="font-semibold text-lg mb-2">Confirm Delete</h2>
            <p className="mb-4 text-sm">Are you sure you want to delete this project?</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteId(null)} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleDelete} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full">
            <h2 className="text-xl font-bold mb-2">{viewProject.name}</h2>
            <p className="mb-4">{viewProject.description}</p>
            <p><strong>Language:</strong> {viewProject.language}</p>
            <p><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(viewProject.status)}`}>{viewProject.status}</span></p>
            <p className="text-sm text-gray-500 mt-3">
              Created: {new Date(viewProject.createdAt).toLocaleString()}
            </p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setViewProject(null)} className="px-4 py-2 bg-gray-200 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;