require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Importación de rutas
const authRoutes = require('./routes/auth.routes');
const reviewRoutes = require('./routes/review.routes');

const app = express();

// Servir archivos estáticos del frontend para renderizar la web
app.use(express.static(path.join(__dirname, '../../frontend')));

// Middlewares de seguridad y parseo
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*'
}));
app.use(express.json());

// Limitador de peticiones para seguridad
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);

// Healthcheck
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'AeroRate API funcionando correctamente' 
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor AeroRate corriendo en http://localhost:${PORT}`);
});