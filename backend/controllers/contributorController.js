import crypto from 'crypto';
import User from '../models/User.js';
import Invite from '../models/Invite.js';

export const getContributors = async (req, res) => {
  try {
    const contributors = await User.find({ role: 'contributor' })
      .select('-passwordHash')
      .sort({ createdAt: -1 });
    res.json({ contributors });
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching contributors' });
  }
};

export const inviteContributor = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Check if invite already exists and is pending
    const existingInvite = await Invite.findOne({ email, status: 'pending' });
    if (existingInvite && existingInvite.expiry > new Date()) {
      return res.status(400).json({ error: 'Invite already sent to this email' });
    }

    // Generate unique token
    const token = crypto.randomBytes(32).toString('hex');

    // Create invite
    const invite = new Invite({
      email,
      token
    });

    await invite.save();

    // Mock email by logging the invite link
    const inviteLink = `${process.env.CLIENT_URL || 'http://localhost:3000'}/invite/${token}`;
    console.log('\n📧 MOCK EMAIL - Invite Link:');
    console.log(`To: ${email}`);
    console.log(`Link: ${inviteLink}`);
    console.log('(In production, this would be sent via email)\n');

    res.status(201).json({
      message: 'Invite sent successfully',
      invite: {
        id: invite._id,
        email: invite.email,
        status: invite.status,
        expiry: invite.expiry,
        createdAt: invite.createdAt
      },
      inviteLink // Include in response for development purposes
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while sending invite' });
  }
};

export const acceptInvite = async (req, res) => {
  try {
    const { token } = req.params;

    // Find and validate invite
    const invite = await Invite.findOne({ token, status: 'pending' });
    if (!invite) {
      return res.status(400).json({ error: 'Invalid or expired invite token' });
    }

    if (invite.expiry < new Date()) {
      return res.status(400).json({ error: 'Invite token has expired' });
    }

    res.json({
      message: 'Invite is valid',
      invite: {
        email: invite.email,
        token: invite.token,
        expiry: invite.expiry
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while validating invite' });
  }
};