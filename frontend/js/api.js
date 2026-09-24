const API_BASE = 'http://localhost:3000/api';

const tokenKey = 'aerorateToken';
const userKey = 'aerorateUser';

function getToken() {
  return localStorage.getItem(tokenKey);
}

function saveSession(data) {
  if (data?.token) {
    localStorage.setItem(tokenKey, data.token);
  }

  if (data?.user) {
    localStorage.setItem(userKey, JSON.stringify(data.user));
  }
}

function clearSession() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { ...(options.headers || {}) };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401 || response.status === 403) {
    clearSession();
    if (window.location.pathname.endsWith('dashboard.html')) {
      window.location.href = 'auth.html';
    }
    throw new Error(data.error || 'Sesión inválida');
  }

  if (!response.ok) {
    throw new Error(data.error || 'Error en la solicitud');
  }

  return data;
}

function renderReviewItem(review) {
  const article = document.createElement('article');
  article.className = 'review-item';

  const user = document.createElement('strong');
  user.textContent = review.username || review.user?.username || 'Viajero AeroRate';

  const rating = document.createElement('em');
  rating.textContent = '★'.repeat(Number(review.rating || 0)) || 'Sin calificación';

  const comment = document.createElement('p');
  comment.textContent = review.comment || 'Sin comentario disponible.';

  article.append(user, rating, comment);
  return article;
}

async function loadReviews() {
  const list = document.getElementById('reviews-list');
  if (!list) return;

  list.innerHTML = '';

  try {
    const response = await fetch(`${API_BASE}/reviews`);
    if (!response.ok) throw new Error('No se pudieron cargar las reseñas');

    const reviews = await response.json();

    if (!Array.isArray(reviews) || reviews.length === 0) {
      const emptyItem = document.createElement('article');
      emptyItem.className = 'review-item';
      const title = document.createElement('strong');
      title.textContent = 'AeroRate';
      const stars = document.createElement('em');
      stars.textContent = '★ ★ ★ ★ ★';
      const text = document.createElement('p');
      text.textContent = 'Aún no hay reseñas. ¡Sé el primero en compartir tu experiencia premium!';
      emptyItem.append(title, stars, text);
      list.appendChild(emptyItem);
      return;
    }

    reviews.slice(0, 4).forEach((review) => list.appendChild(renderReviewItem(review)));
  } catch (error) {
    console.warn('Fallo al cargar reseñas:', error);
    const fallbackItem = document.createElement('article');
    fallbackItem.className = 'review-item';
    const title = document.createElement('strong');
    title.textContent = 'AeroRate';
    const stars = document.createElement('em');
    stars.textContent = '★ ★ ★ ★ ★';
    const text = document.createElement('p');
    text.textContent = 'La comunidad está en vuelo. Recarga la página para ver las opiniones más recientes.';
    fallbackItem.append(title, stars, text);
    list.appendChild(fallbackItem);
  }
}

async function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById('reg-username')?.value?.trim();
  const email = document.getElementById('reg-email')?.value?.trim();
  const password = document.getElementById('reg-password')?.value?.trim();

  if (!username || !email || !password) {
    alert('Completá todos los campos para crear la cuenta.');
    return;
  }

  try {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    saveSession(data);
    alert(`Cuenta creada con éxito, ${data.user.username}.`);
    event.target.reset();
    window.location.href = 'dashboard.html';
  } catch (error) {
    console.error(error);
    alert(error.message || 'No se pudo crear la cuenta.');
  }
}

async function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById('login-email')?.value?.trim();
  const password = document.getElementById('login-password')?.value?.trim();

  if (!email || !password) {
    alert('Ingresá tu email y contraseña.');
    return;
  }

  try {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    saveSession(data);
    alert(`Bienvenido, ${data.user.username}.`);
    event.target.reset();
    window.location.href = 'dashboard.html';
  } catch (error) {
    console.error(error);
    alert(error.message || 'No se pudo iniciar sesión.');
  }
}

async function submitReview(event) {
  event.preventDefault();
  const rating = document.getElementById('review-rating')?.value;
  const comment = document.getElementById('review-comment')?.value?.trim();

  if (!rating || !comment) {
    alert('Seleccioná una puntuación y escribí una reseña.');
    return;
  }

  try {
    const data = await apiFetch('/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: Number(rating), comment })
    });

    event.target.reset();
    if (typeof loadMyReviews === 'function') {
      await loadMyReviews();
    }
    if (typeof loadReviews === 'function') {
      await loadReviews();
    }
    alert('¡Reseña publicada con éxito!');
  } catch (error) {
    console.error(error);
    alert(error.message || 'No se pudo publicar la reseña.');
  }
}

async function loadMyReviews() {
  const list = document.getElementById('my-reviews');
  if (!list) return;

  list.textContent = '';
  const emptyState = document.createElement('p');
  emptyState.className = 'empty-state';

  try {
    const reviews = await apiFetch('/reviews/mine');

    if (!Array.isArray(reviews) || reviews.length === 0) {
      emptyState.textContent = 'Todavía no tenés reseñas. Creá tu primera experiencia.';
      list.appendChild(emptyState);
      return;
    }

    reviews.forEach((review) => {
      const item = document.createElement('article');
      item.className = 'review-item';

      const title = document.createElement('strong');
      title.textContent = `${review.rating}★`;
      const text = document.createElement('p');
      text.textContent = review.comment;

      const actions = document.createElement('div');
      actions.className = 'review-actions';

      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'secondary-btn';
      editBtn.textContent = 'Editar';
      editBtn.addEventListener('click', async () => {
        document.getElementById('review-rating').value = review.rating;
        document.getElementById('review-comment').value = review.comment;
        const saveBtn = document.getElementById('review-submit');
        if (saveBtn) {
          saveBtn.textContent = 'Guardar cambios';
          saveBtn.dataset.editId = review.id;
        }
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'ghost-btn';
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.addEventListener('click', async () => {
        if (!window.confirm('¿Querés eliminar esta reseña?')) return;
        await apiFetch(`/reviews/${review.id}`, { method: 'DELETE' });
        await loadMyReviews();
      });

      actions.append(editBtn, deleteBtn);
      item.append(title, text, actions);
      list.appendChild(item);
    });
  } catch (error) {
    emptyState.textContent = 'No se pudieron cargar tus reseñas.';
    list.appendChild(emptyState);
  }
}

function logoutUser() {
  clearSession();
  window.location.href = 'auth.html';
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'auth' && getToken()) {
    window.location.href = 'dashboard.html';
  }

  if (document.body.dataset.page === 'dashboard' && !getToken()) {
    window.location.href = 'auth.html';
  }

  if (document.body.dataset.page === 'dashboard') {
    const user = JSON.parse(localStorage.getItem(userKey) || 'null');
    const welcome = document.getElementById('welcome-user');
    if (welcome && user?.username) {
      welcome.textContent = `Bienvenido, ${user.username}`;
    }
    loadMyReviews();
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', logoutUser);
  }

  loadReviews();

  const reviewForm = document.getElementById('review-form');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (reviewForm) {
    reviewForm.addEventListener('submit', async (event) => {
      const saveBtn = document.getElementById('review-submit');
      const editId = saveBtn?.dataset?.editId;

      if (editId) {
        event.preventDefault();
        const rating = document.getElementById('review-rating').value;
        const comment = document.getElementById('review-comment').value.trim();

        try {
          await apiFetch(`/reviews/${editId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating: Number(rating), comment })
          });

          saveBtn.textContent = 'Publicar reseña';
          delete saveBtn.dataset.editId;
          event.target.reset();
          await loadMyReviews();
          alert('Reseña actualizada');
        } catch (error) {
          alert(error.message || 'No se pudo actualizar');
        }
        return;
      }

      submitReview(event);
    });
  }

  if (loginForm) loginForm.addEventListener('submit', loginUser);
  if (registerForm) registerForm.addEventListener('submit', registerUser);
});
