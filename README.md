# AeroRate

Una plataforma para que viajeros compartan reseñas de vuelos y tomen decisiones con más confianza antes de reservar.

## Demo
- App: https://aerorate.vercel.app
- API: https://aerorate.onrender.com
- Cuenta de prueba: admin@aerorate.com / password123

## Capturas
- Vista principal con hero cinematográfico y video de fondo.
- Panel de autenticación y reseñas con diseño moderno.

## Stack
- Node.js
- Express
- PostgreSQL + Supabase
- JWT
- bcryptjs
- Helmet
- CORS
- Express-rate-limit

## Endpoints

| Método | Ruta | Protegida | Qué hace |
|---|---|---|---|
| POST | /api/auth/register | No | Crea una cuenta |
| POST | /api/auth/login | No | Inicia sesión y devuelve JWT |
| GET | /api/reviews | No | Lista todas las reseñas |
| GET | /api/reviews/mine | Sí | Lista solo las reseñas del usuario |
| POST | /api/reviews | Sí | Crea una reseña |
| PATCH | /api/reviews/:id | Sí | Actualiza una reseña propia o del admin |
| DELETE | /api/reviews/:id | Sí | Elimina una reseña propia o del admin |
| GET | /api/health | No | Verifica que la API está funcionando |

## Cómo correrlo en local
1. git clone https://github.com/tu-usuario/aerorate.git
2. cd aerorate
3. npm install
4. cp backend/.env.example .env
5. completar DATABASE_URL y JWT_SECRET
6. npm run dev

## Seguridad aplicada
- Passwords almacenadas con bcrypt
- JWT con expiración
- Middleware de autenticación
- CORS con origen permitido
- Rate limiting en auth
- Helmet para headers seguros
- Consultas SQL con placeholders
- Validación de inputs y manejo de errores de 400, 401, 403, 404 y 500
