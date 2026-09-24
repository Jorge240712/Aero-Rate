CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@aerorate.com', '$2a$10$Qw0hV7r6r7g3a4L7QvJ7e.bN9i4Q2y9N0bF0LJ6RrR6i8H3I3m2C.', 'admin'),
('martin', 'martin@aerorate.com', '$2a$10$Qw0hV7r6r7g3a4L7QvJ7e.bN9i4Q2y9N0bF0LJ6RrR6i8H3I3m2C.', 'user');

INSERT INTO reviews (user_id, rating, comment) VALUES
(1, 5, 'Excelente atención y servicio premium. El vuelo fue muy cómodo y puntual.'),
(2, 4, 'Muy buena experiencia general, aunque la comida pudo mejorar un poco.');
