import express from 'express';
import { getContributors, inviteContributor, acceptInvite } from '../controllers/contributorController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, requireAdmin, getContributors);
router.post('/invite', authenticateToken, requireAdmin, (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    inviteContributor(req, res);
});
router.get('/accept/:token', acceptInvite);

export default router;