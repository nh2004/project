import Project from '../models/Project.js';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// GET all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ projects });
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    res.status(500).json({ error: 'Server error while fetching projects' });
  }
};

// CREATE a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, language, status } = req.body;

    // Validation
    if (!name || !description || !language) {
      return res
        .status(400)
        .json({ error: 'Name, description, and language are required' });
    }

    const project = new Project({
      name,
      description,
      language,
      status: status || 'active',
    });

    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    console.error('❌ Error creating project:', error);
    res.status(500).json({ error: 'Server error while creating project' });
  }
};

// UPDATE an existing project by ID
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, language, status } = req.body;

    // Validation
    if (!name || !description || !language) {
      return res
        .status(400)
        .json({ error: 'Name, description, and language are required' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, description, language, status },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      message: 'Project updated successfully',
      project: updatedProject,
    });
  } catch (error) {
    console.error('❌ Error updating project:', error);
    res.status(500).json({ error: 'Server error while updating project' });
  }
};

// DELETE a project by ID
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting project:', error);
    res.status(500).json({ error: 'Server error while deleting project' });
  }
};