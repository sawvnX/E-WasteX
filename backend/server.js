import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Database Connect
connectDB();

// API Mounting
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('<h1>E-WasteX API Server</h1><p>Status: Active</p>');
});

app.listen(PORT, () => {
  console.log(`[E-WasteX Backend] Server listening on http://localhost:${PORT}`);
});
