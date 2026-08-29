import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const PORT = Number(process.env.PORT || 3001);
const ENV = process.env.NODE_ENV || 'development';
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.disable('x-powered-by');

app.use(cors({
  origin: CLIENT_ORIGIN === '*' ? true : CLIENT_ORIGIN,
  credentials: true
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'SELCO SevaConnect API',
    timestamp: new Date().toISOString(),
    environment: ENV
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

app.get('/api/meta', (req, res) => {
  res.json({
    app: 'SELCO SevaConnect',
    version: '2.0.0',
    backend: 'Express',
    frontend: 'React + Vite',
    deployment: 'GitHub Pages + API-ready backend'
  });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`SELCO SevaConnect API running on http://localhost:${PORT} in ${ENV} mode`);
  });
};

try {
  startServer();
} catch (error) {
  if (error.code === 'EADDRINUSE') {
    const fallbackPort = PORT + 1;
    console.warn(`Port ${PORT} is busy. Retrying on ${fallbackPort}`);
    app.listen(fallbackPort, () => {
      console.log(`SELCO SevaConnect API running on http://localhost:${fallbackPort} in ${ENV} mode`);
    });
  } else {
    throw error;
  }
}
