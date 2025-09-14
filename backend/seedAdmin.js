import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config({ path: '../.env' });

const seedAdmin = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const email = 'admin@example.com';
    const password = 'admin123'; // Change as needed
    const name = 'Admin User';

    const existing = await User.findOne({ email });
    if (existing) {
        console.log('Admin user already exists.');
        process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = new User({
        name,
        email,
        passwordHash,
        role: 'admin',
    });

    await admin.save();
    console.log('✅ Admin user created:', { email, password });
    process.exit(0);
};

seedAdmin();