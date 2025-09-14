import express from 'express';
import { getContributors, inviteContributor, acceptInvite } from '../controllers/contributorController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, requireAdmin, getContributors);
router.post('/invite', authenticateToken, requireAdmin, inviteContributor);
router.get('/accept/:token', acceptInvite);

export default router;