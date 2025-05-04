require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Servir favicon o archivos estáticos (opcional)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de prueba para evitar 404 en "/"
app.get('/', (req, res) => {
  res.send('✅ Backend CEMD funcionando correctamente');
});

// Rutas de la API
app.use('/api', require('./routes/index.routes'));

// Manejo de ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Export para Vercel
module.exports = app;

// Arrancar en desarrollo local
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  });
}
