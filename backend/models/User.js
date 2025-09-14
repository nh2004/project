import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'contributor'],
    default: 'contributor'
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

export default mongoose.model('User', userSchema);