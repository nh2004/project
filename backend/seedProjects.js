// seedProjects.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';

dotenv.config({ path: '../.env' }); // Adjust if needed

const seedProjects = async () => {
  try {
    // 🔗 Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🚀 Connected to MongoDB');

    // 🧹 Optional: Clear old projects
    await Project.deleteMany({});
    console.log('🗑️ Old projects cleared');

    // 📦 Seed data (15 diverse projects)
    const projects = [
      {
        name: 'Outlier AI Platform',
        description: 'AI platform for ML workflows with scalable pipelines.',
        language: 'JavaScript',
        status: 'active',
      },
      {
        name: 'Finance Tracker',
        description: 'Track expenses, budgets, and generate reports.',
        language: 'Python',
        status: 'completed',
      },
      {
        name: 'E-commerce Store',
        description: 'Multi-vendor platform with payment integration.',
        language: 'Java',
        status: 'on-hold',
      },
      {
        name: 'Realtime Chat App',
        description: 'Realtime chat with end-to-end encryption.',
        language: 'TypeScript',
        status: 'active',
      },
      {
        name: 'Game Engine',
        description: 'Experimental 2D/3D game engine for rendering.',
        language: 'C++',
        status: 'cancelled',
      },
      {
        name: 'Weather Dashboard',
        description: 'Visualize real-time weather APIs with graphs.',
        language: 'React',
        status: 'active',
      },
      {
        name: 'Portfolio Website',
        description: 'Modern portfolio with animations and projects showcase.',
        language: 'Next.js',
        status: 'completed',
      },
      {
        name: 'Social Media Clone',
        description: 'Full-stack social media platform with likes and follows.',
        language: 'Node.js',
        status: 'active',
      },
      {
        name: 'Blog CMS',
        description: 'Content management system with Markdown editor.',
        language: 'PHP',
        status: 'completed',
      },
      {
        name: 'Healthcare Records',
        description: 'Patient management system with secure storage.',
        language: 'C#',
        status: 'on-hold',
      },
      {
        name: 'Travel Booking System',
        description: 'Booking engine for hotels, flights, tours.',
        language: 'Ruby',
        status: 'active',
      },
      {
        name: 'IoT Controller',
        description: 'Embedded system to manage IoT devices via dashboard.',
        language: 'Go',
        status: 'active',
      },
      {
        name: 'Music Streaming App',
        description: 'Spotify-like app with playlists and recommendations.',
        language: 'Swift',
        status: 'completed',
      },
      {
        name: 'E-learning Platform',
        description: 'Online courses platform with progress tracking.',
        language: 'Kotlin',
        status: 'active',
      },
      {
        name: 'DevOps Monitoring Tool',
        description: 'Monitor pipelines, deployments, and logs.',
        language: 'Rust',
        status: 'on-hold',
      },
    ];

    // Insert projects
    await Project.insertMany(projects);
    console.log(`✅ ${projects.length} projects seeded successfully!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding projects:', err.message);
    process.exit(1);
  }
};

seedProjects();