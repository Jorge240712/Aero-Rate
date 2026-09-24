const db = require('../config/db');

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

const getAdminReviews = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Solo el administrador puede acceder a esta ruta' });
  }

  try {
    const result = await db.query(
      `SELECT r.id, r.rating, r.comment, r.created_at, u.username, u.email
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       ORDER BY r.created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al listar reseñas de admin:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getMyReviews = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT r.id, r.rating, r.comment, r.created_at
       FROM reviews r
       WHERE r.user_id = $1
       ORDER BY r.created_at DESC`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener mis reseñas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const userId = req.user.id;

  if (rating === undefined || rating === null || !comment || typeof comment !== 'string') {
    return res.status(400).json({ error: 'La calificación y el comentario son requeridos' });
  }

  const numericRating = Number(rating);
  if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
    return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5' });
  }

  const safeComment = comment.trim();
  if (safeComment.length < 3) {
    return res.status(400).json({ error: 'El comentario debe tener al menos 3 caracteres' });
  }

  try {
    const newReview = await db.query(
      'INSERT INTO reviews (user_id, rating, comment) VALUES ($1, $2, $3) RETURNING *',
      [userId, numericRating, safeComment]
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

const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  if (!id || Number.isNaN(Number(id))) {
    return res.status(400).json({ error: 'El id de la reseña no es válido' });
  }

  if (rating === undefined || comment === undefined) {
    return res.status(400).json({ error: 'Debes enviar la calificación y el comentario' });
  }

  const numericRating = Number(rating);
  if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
    return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5' });
  }

  const safeComment = String(comment).trim();
  if (safeComment.length < 3) {
    return res.status(400).json({ error: 'El comentario debe tener al menos 3 caracteres' });
  }

  try {
    const existing = await db.query('SELECT * FROM reviews WHERE id = $1', [Number(id)]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }

    if (existing.rows[0].user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No podés editar una reseña ajena' });
    }

    const updated = await db.query(
      'UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 RETURNING *',
      [numericRating, safeComment, Number(id)]
    );

    res.json({ message: 'Reseña actualizada con éxito', review: updated.rows[0] });
  } catch (error) {
    console.error('Error al actualizar reseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (!id || Number.isNaN(Number(id))) {
    return res.status(400).json({ error: 'El id de la reseña no es válido' });
  }

  try {
    const existing = await db.query('SELECT * FROM reviews WHERE id = $1', [Number(id)]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }

    if (existing.rows[0].user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No podés eliminar una reseña ajena' });
    }

    await db.query('DELETE FROM reviews WHERE id = $1', [Number(id)]);
    res.json({ message: 'Reseña eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getAllReviews,
  getAdminReviews,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview
};