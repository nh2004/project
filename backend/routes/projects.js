import express from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, requireAdmin, getProjects);
router.post('/', authenticateToken, requireAdmin, createProject);

// ✅ Add update route
router.put('/:id', authenticateToken, requireAdmin, updateProject);

// ✅ Add delete route
router.delete('/:id', authenticateToken, requireAdmin, deleteProject);

export default router;