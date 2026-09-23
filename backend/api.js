// URL base de tu backend desplegado en Render
const API_URL = 'https://proyecto-final-backend-3.onrender.com/api';

// Función para registrar un nuevo usuario
async function registerUser(username, email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error en el registro');
    return data;
  } catch (error) {
    console.error('Error al registrar:', error);
    alert(error.message);
  }
}

// Función para iniciar sesión
async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión');
    
    // Guardar el token JWT en el navegador
    if (data.token) {
      localStorage.setItem('token', data.token);
      alert('¡Sesión iniciada con éxito!');
    }
    return data;
  } catch (error) {
    console.error('Error en login:', error);
    alert(error.message);
  }
}

// Función para obtener las reseñas públicas
async function fetchReviews() {
  try {
    const response = await fetch(`${API_URL}/reviews`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al cargar reseñas');
    return data;
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
  }
}

// Escuchar los formularios del HTML al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      await loginUser(email, password);
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('reg-username').value;
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-password').value;
      await registerUser(username, email, password);
    });
  }
});