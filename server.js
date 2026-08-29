import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'SELCO SevaConnect API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/dashboard', (req, res) => {
  res.json({
    totalTickets: 128,
    resolvedToday: 24,
    activeTechnicians: 18,
    uptime: '99.4%',
    region: 'Belgaum, Karnataka',
    lastUpdated: new Date().toISOString()
  });
});

app.get('/api/impact', (req, res) => {
  res.json({
    householdsServed: 2840,
    womenTechnicians: 48,
    avgResponseHours: 2.4,
    renewableEnergyGenerated: '8.6 MWh/day'
  });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`SELCO SevaConnect API running on http://localhost:${PORT}`);
});
