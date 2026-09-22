const { Pool } = require('pg');

// Creamos la piscina de conexiones usando la URL de Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Requerido para conexiones externas a Supabase
  }
});

// Evento opcional para confirmar conexión en consola
pool.on('connect', () => {
  console.log('Base de datos conectada con éxito a Supabase');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};