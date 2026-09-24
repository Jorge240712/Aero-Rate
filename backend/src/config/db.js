const { Pool } = require('pg');

const memoryDb = {
  users: [
    {
      id: 1,
      username: 'lucia',
      email: 'lucia@aerorate.com',
      password_hash: '$2a$10$zI6vQqS4j2lX/g1m8B9LDu6i5V1G2j7lQvJv5K7VHJ4EHFZ0OD9wi',
      role: 'user'
    },
    {
      id: 2,
      username: 'mateo',
      email: 'mateo@aerorate.com',
      password_hash: '$2a$10$zI6vQqS4j2lX/g1m8B9LDu6i5V1G2j7lQvJv5K7VHJ4EHFZ0OD9wi',
      role: 'user'
    },
    {
      id: 3,
      username: 'sofia',
      email: 'sofia@aerorate.com',
      password_hash: '$2a$10$zI6vQqS4j2lX/g1m8B9LDu6i5V1G2j7lQvJv5K7VHJ4EHFZ0OD9wi',
      role: 'user'
    }
  ],
  reviews: [
    {
      id: 1,
      user_id: 1,
      rating: 5,
      comment: 'Lisboa fue increíble: transporte fácil, comida genial y la sensación de que cada barrio tenía su propia personalidad.',
      created_at: '2026-09-01T10:00:00.000Z'
    },
    {
      id: 2,
      user_id: 2,
      rating: 4,
      comment: 'Kyoto me dejó sin palabras. Todo muy tranquilo, hermoso y cálido. El vuelo fue cómodo y bien organizado.',
      created_at: '2026-09-05T15:30:00.000Z'
    },
    {
      id: 3,
      user_id: 3,
      rating: 5,
      comment: 'Roma fue perfecta para un viaje de cultura y gastronomía. Mucha energía, excelente comida y muy buena organización.',
      created_at: '2026-09-10T08:15:00.000Z'
    }
  ]
};

const buildUserRecord = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  password_hash: user.password_hash,
  role: user.role || 'user'
});

let pool = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
  });

  pool.on('connect', () => {
    console.log('Base de datos conectada con éxito a Supabase');
  });
}

const query = async (text, params = []) => {
  if (!pool) {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('select * from users where email = $1')) {
      const email = params[0];
      const user = memoryDb.users.find((item) => item.email === email);
      return { rows: user ? [buildUserRecord(user)] : [] };
    }

    if (lowerText.includes('select id from users where email = $1 or username = $2')) {
      const [email, username] = params;
      const rows = memoryDb.users.filter((item) => item.email === email || item.username === username);
      return { rows };
    }

    if (lowerText.includes('insert into users')) {
      const [username, email, passwordHash] = params;
      const id = memoryDb.users.length ? Math.max(...memoryDb.users.map((item) => item.id)) + 1 : 1;
      const user = { id, username, email, password_hash: passwordHash, role: 'user' };
      memoryDb.users.push(user);
      return {
        rows: [{ id: user.id, username: user.username, email: user.email, role: user.role }]
      };
    }

    if (lowerText.includes('select r.id, r.rating, r.comment, r.created_at, u.username')) {
      const rows = memoryDb.reviews
        .map((review) => ({
          id: review.id,
          rating: review.rating,
          comment: review.comment,
          created_at: review.created_at,
          username: memoryDb.users.find((u) => u.id === review.user_id)?.username || 'Usuario'
        }))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      return { rows };
    }

    if (lowerText.includes('insert into reviews')) {
      const [userId, rating, comment] = params;
      const id = memoryDb.reviews.length ? Math.max(...memoryDb.reviews.map((item) => item.id)) + 1 : 1;
      const row = { id, user_id: userId, rating, comment, created_at: new Date().toISOString() };
      memoryDb.reviews.push(row);
      return { rows: [row] };
    }

    if (lowerText.includes('update reviews set rating = $1, comment = $2 where id = $3 and user_id = $4')) {
      const [rating, comment, reviewId, userId] = params;
      const index = memoryDb.reviews.findIndex((item) => item.id === Number(reviewId) && item.user_id === Number(userId));
      if (index === -1) return { rows: [] };
      memoryDb.reviews[index] = { ...memoryDb.reviews[index], rating, comment };
      return { rows: [memoryDb.reviews[index]] };
    }

    if (lowerText.includes('delete from reviews where id = $1 and user_id = $2')) {
      const [reviewId, userId] = params;
      const foundIndex = memoryDb.reviews.findIndex((item) => item.id === Number(reviewId) && item.user_id === Number(userId));
      if (foundIndex === -1) return { rowCount: 0 };
      memoryDb.reviews.splice(foundIndex, 1);
      return { rowCount: 1 };
    }

    if (lowerText.includes('select * from reviews where id = $1')) {
      const [reviewId] = params;
      const review = memoryDb.reviews.find((item) => item.id === Number(reviewId));
      return { rows: review ? [review] : [] };
    }

    if (lowerText.includes('delete from reviews where id = $1')) {
      const [reviewId] = params;
      const foundIndex = memoryDb.reviews.findIndex((item) => item.id === Number(reviewId));
      if (foundIndex === -1) return { rowCount: 0 };
      memoryDb.reviews.splice(foundIndex, 1);
      return { rowCount: 1 };
    }

    if (lowerText.includes('update reviews set rating = $1, comment = $2 where id = $3')) {
      const [rating, comment, reviewId] = params;
      const index = memoryDb.reviews.findIndex((item) => item.id === Number(reviewId));
      if (index === -1) return { rows: [] };
      memoryDb.reviews[index] = { ...memoryDb.reviews[index], rating, comment };
      return { rows: [memoryDb.reviews[index]] };
    }

    return { rows: [] };
  }

  return pool.query(text, params);
};

module.exports = { query };