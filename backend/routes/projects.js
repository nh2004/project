import express from 'express';
import { getProjects, createProject } from '../controllers/projectController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, requireAdmin, getProjects);
router.post('/', authenticateToken, requireAdmin, createProject);

export default router;