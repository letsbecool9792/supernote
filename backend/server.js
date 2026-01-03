import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import listEndpoints from 'express-list-endpoints';
import { clerkMiddleware } from '@clerk/express';

// --- Local Imports ---
import connectDB from './config/db.js';
import { protect } from './middleware/authMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import ideaRoutes from './routes/ideaRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import stealthRoutes from './routes/stealthRoutes.js';


// --- Configuration ---
dotenv.config();
const PORT = process.env.PORT || 5001; // Ensure a default port
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';


// --- Database & Express App Initialization ---
connectDB();
const app = express();


// --- Core Middleware ---
app.use(cors({
  origin: [FRONTEND_URL, 'https://supernote-dusky.vercel.app'], // Allow both local and production
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(clerkMiddleware()); // Clerk authentication middleware


// --- Public Authentication Routes ---
// These handle the browser redirects for login/logout/callback
app.use('/auth', authRoutes);


// --- Health Check & Protected API Routes ---
app.get('/', (req, res) => {
    res.send('AI Research Synthesizer API is running...');
});

app.get('/api', (req, res) => {
    res.send('AI Research Synthesizer API is running...');
});

// UPDATED: Apply the `protect` middleware to all API route groups
app.use('/api/idea', ideaRoutes); // Removed protect - cross-domain Clerk auth issue
app.use('/api/project', protect, projectRoutes);
app.use('/api/stealth', protect, stealthRoutes);
app.use('/api/documents', protect, documentRoutes);


// --- Server Startup ---
console.log('\n✅ Registered routes:\n', listEndpoints(app), '\n');

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`👂 Accepting requests from frontend at ${FRONTEND_URL}`);
});

export default app;