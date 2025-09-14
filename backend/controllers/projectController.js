import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching projects' });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, description, language, status } = req.body;

    // Validate input
    if (!name || !description || !language) {
      return res.status(400).json({ error: 'Name, description, and language are required' });
    }

    const project = new Project({
      name,
      description,
      language,
      status: status || 'active'
    });

    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while creating project' });
  }
};