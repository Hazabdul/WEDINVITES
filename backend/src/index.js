import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // Allow local images to be loaded
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
import authRoutes from './routes/authRoutes.js';
import invitationRoutes from './routes/invitationRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import metaRoutes from './routes/metaRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/', metaRoutes);

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
