const db = require('../config/db');

// Obtener todas las reseñas
const getAllReviews = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT r.id, r.rating, r.comment, r.created_at, u.username 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       ORDER BY r.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear una nueva reseña (Ruta protegida)
const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const userId = req.user.id; // Extraído del token JWT por el middleware

  if (!rating || !comment) {
    return res.status(400).json({ error: 'La calificación y el comentario son requeridos' });
  }

  try {
    const newReview = await db.query(
      'INSERT INTO reviews (user_id, rating, comment) VALUES ($1, $2, $3) RETURNING *',
      [userId, rating, comment]
    );

    res.status(201).json({
      message: 'Reseña publicada con éxito',
      review: newReview.rows[0]
    });
  } catch (error) {
    console.error('Error al crear reseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getAllReviews,
  createReview
};