const personas = [
  {
    name: 'Lucía Moreno',
    type: 'City Break',
    initials: 'LM',
    description: 'Le gusta combinar cafés de barrio, buen diseño y experiencias culturales en ciudades compactas.'
  },
  {
    name: 'Mateo Ruiz',
    type: 'Nómade',
    initials: 'MR',
    description: 'Busca conexión Wi‑Fi, estaciones de trabajo inspiradoras y rutas que le permitan moverse rápido.'
  },
  {
    name: 'Sofía Vega',
    type: 'Naturaleza',
    initials: 'SV',
    description: 'Prefiere paisajes intensos, senderos tranquilos y alojamientos con vistas sorprendentes.'
  },
  {
    name: 'Nicolás Peña',
    type: 'Food Scout',
    initials: 'NP',
    description: 'Toda su decisión de destino gira en torno a mercados, restaurantes locales y experiencias gastronómicas.'
  }
];

const destinations = [
  {
    country: 'Portugal',
    city: 'Lisboa',
    vibe: 'Cultural',
    emoji: '🌊',
    cost: '€€',
    category: 'cultura',
    text: 'Ideal para rutas en tramos cortos, luminosa, vibrante y muy cómoda para moverse a pie.'
  },
  {
    country: 'Japón',
    city: 'Kyoto',
    vibe: 'Tradición',
    emoji: '⛩️',
    cost: '€€€',
    category: 'cultura',
    text: 'Perfecta para viajeros que buscan belleza, calma y un viaje más contemplativo.'
  },
  {
    country: 'Italia',
    city: 'Roma',
    vibe: 'Food',
    emoji: '🍝',
    cost: '€€',
    category: 'food',
    text: 'Rutas gastronómicas, edificios históricos y mucha energía por minuto.'
  },
  {
    country: 'Noruega',
    city: 'Bergen',
    vibe: 'Naturaleza',
    emoji: '🏔️',
    cost: '€€€',
    category: 'naturaleza',
    text: 'Para quien busca paisajes gigantes, tranquilidad y una conexión más íntima con la naturaleza.'
  },
  {
    country: 'México',
    city: 'Oaxaca',
    vibe: 'Local',
    emoji: '🌮',
    cost: '€€',
    category: 'food',
    text: 'Un destino intenso para vivir cultura, arte, mercados y una gastronomía memorable.'
  },
  {
    country: 'Corea del Sur',
    city: 'Seúl',
    vibe: 'Nómade',
    emoji: '📡',
    cost: '€€',
    category: 'nomade',
    text: 'Muy buena opción para viajes con movimiento constante, tecnología y experiencias urbanas.'
  },
  {
    country: 'Grecia',
    city: 'Santorini',
    vibe: 'Relax',
    emoji: '☀️',
    cost: '€€€',
    category: 'naturaleza',
    text: 'Caletas, vistas panorámicas y una experiencia muy fotogénica para desconectar.'
  },
  {
    country: 'Francia',
    city: 'París',
    vibe: 'Romance',
    emoji: '🗼',
    cost: '€€€',
    category: 'cultura',
    text: 'Ideal para quienes buscan arte, cultura, paseos y una ciudad con una energía constante.'
  }
];

const stories = [
  {
    quote: 'Las rutas de barrio te permiten sentir la ciudad sin tener que depender del tour clásico.',
    author: 'Camila S.'
  },
  {
    quote: 'Elegimos un vuelo temprano y el cambio de energía en Kyoto fue brutal: más calma, menos caos.',
    author: 'Tomás R.'
  },
  {
    quote: 'Profundamente recomendable para quienes quieren vivir la ciudad sin perder el tiempo en traslados largos.',
    author: 'Valentina M.'
  },
  {
    quote: 'La mejor parte fue cruzar del centro a los barrios más locales. Ahí descubrí la verdadera esencia.',
    author: 'Javier L.'
  }
];

const airlines = [
  {
    name: 'Iberia',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    type: 'premium',
    route: 'Madrid → Lisboa',
    price: 179,
    score: 92,
    description: 'Muy buena conectividad y comodidad en trayectos europeos.'
  },
  {
    name: 'Qatar Airways',
    image: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    type: 'premium',
    route: 'Buenos Aires → Doha',
    price: 620,
    score: 98,
    description: 'Excelente servicio, espacio y atención premium.'
  },
  {
    name: 'Lufthansa',
    image: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=900&q=80',
    rating: 4.7,
    type: 'premium',
    route: 'Madrid → Frankfurt',
    price: 240,
    score: 90,
    description: 'Muy confiable para conexiones internacionales.'
  },
  {
    name: 'Ryanair',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=900&q=80',
    rating: 4.1,
    type: 'economy',
    route: 'Barcelona → Roma',
    price: 95,
    score: 74,
    description: 'Opción muy buena si priorizás precio por encima de extras.'
  },
  {
    name: 'Emirates',
    image: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    type: 'premium',
    route: 'Madrid → Dubai',
    price: 540,
    score: 97,
    description: 'Ideal para viajes largos con mucha comodidad.'
  },
  {
    name: 'KLM',
    image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=80',
    rating: 4.6,
    type: 'economy',
    route: 'Londres → Ámsterdam',
    price: 150,
    score: 88,
    description: 'Muy buena relación precio-calidad y puntualidad.'
  }
];

const featuredReviews = [
  { city: 'Lisboa', rating: 5, title: 'Perfecto para un weekend intenso', text: 'Muy buen transporte, clima ideal y una variedad enorme de cafés. Lo volvería a repetir sin dudas.' },
  { city: 'Kyoto', rating: 5, title: 'Paz y cultura en cada rincón', text: 'La experiencia fue más tranquila que esperaba. El barrio antiguo vale cada minuto.' },
  { city: 'Roma', rating: 4, title: 'Mucho sabor y mucha historia', text: 'La comida y la energía de la ciudad son increíbles. El único detalle fue la distancia de algunos puntos.' }
];

function renderPersonas() {
  const container = document.querySelector('[data-personas]');
  if (!container) return;

  container.innerHTML = personas
    .map(
      (persona) => `
        <article class="persona-card glass-card">
          <div class="avatar">${persona.initials}</div>
          <h3>${persona.name}</h3>
          <span class="persona-tag">${persona.type}</span>
          <p>${persona.description}</p>
        </article>
      `
    )
    .join('');
}

function renderDestinations(list = destinations) {
  const container = document.querySelector('[data-destinations]');
  if (!container) return;

  container.innerHTML = list
    .map(
      (item) => `
        <article class="destination-card glass-card">
          <div class="thumb">${item.emoji}</div>
          <div class="meta-row">
            <span>${item.country}</span>
            <span>${item.cost}</span>
          </div>
          <h3>${item.city}</h3>
          <span class="pill">${item.vibe}</span>
          <p>${item.text}</p>
          <div class="pill-list">
            <span class="pill">Tranquilo</span>
            <span class="pill">Bien conectado</span>
          </div>
        </article>
      `
    )
    .join('');
}

function renderAirlines() {
  const container = document.querySelector('[data-airlines]');
  if (!container) return;

  container.innerHTML = airlines
    .map(
      (airline) => `
        <article class="airline-card glass-card">
          <div class="airline-image" style="background-image:url('${airline.image}')"></div>
          <div class="airline-body">
            <div class="airline-header">
              <h3>${airline.name}</h3>
              <span>${airline.rating.toFixed(1)}★</span>
            </div>
            <p>${airline.route}</p>
            <div class="airline-meta">
              <span class="tag">${airline.type}</span>
              <strong>desde €${airline.price}</strong>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

function renderTopDestinations() {
  const container = document.querySelector('[data-top-destinations]');
  if (!container) return;

  const popular = destinations.slice(0, 4);
  container.innerHTML = popular
    .map(
      (item) => `
        <article class="mini-destination glass-card">
          <div class="mini-thumb">${item.emoji}</div>
          <div>
            <span class="mini-label">${item.country}</span>
            <h3>${item.city}</h3>
            <p>${item.text}</p>
          </div>
        </article>
      `
    )
    .join('');
}

function renderFeaturedReviews() {
  const container = document.querySelector('[data-featured-reviews]');
  if (!container) return;

  container.innerHTML = featuredReviews
    .map(
      (item) => `
        <article class="mini-review glass-card">
          <div class="review-topline">
            <span>${item.city}</span>
            <strong>${'★'.repeat(item.rating)}</strong>
          </div>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join('');
}

function renderStories() {
  const container = document.querySelector('[data-stories]');
  if (!container) return;

  container.innerHTML = stories
    .map(
      (story) => `
        <article class="story-card glass-card">
          <p class="quote">“${story.quote}”</p>
          <strong>${story.author}</strong>
        </article>
      `
    )
    .join('');
}

function initReveal() {
  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
  document.getElementById('year').textContent = new Date().getFullYear();
}

function calculateBestAirline(fromCity, toCity, budget) {
  const normalized = airlines
    .map((airline) => {
      let bonus = 0;
      if (budget === 'economy' && airline.type === 'economy') bonus += 10;
      if (budget === 'premium' && airline.type === 'premium') bonus += 12;
      if (fromCity === 'Madrid' && airline.name === 'Iberia') bonus += 8;
      if (toCity === 'Kyoto' && airline.name === 'Qatar Airways') bonus += 10;
      if (toCity === 'Roma' && airline.name === 'Ryanair') bonus += 6;
      return {
        ...airline,
        finalScore: Math.min(100, airline.score + bonus)
      };
    })
    .sort((a, b) => b.finalScore - a.finalScore);

  return normalized[0];
}

function renderBestFlightResult(fromCity, toCity, budget) {
  const resultBox = document.getElementById('best-flight-result');
  if (!resultBox) return;

  const selected = calculateBestAirline(fromCity, toCity, budget);
  resultBox.innerHTML = `
    <span class="result-label">Mejor opción</span>
    <div class="result-row">
      <strong>${selected.name}</strong>
      <span>${selected.finalScore.toFixed(0)}% fit</span>
    </div>
    <p>${fromCity} → ${toCity} · desde €${selected.price} · ${selected.type}</p>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderPersonas();
  renderDestinations();
  renderStories();
  renderTopDestinations();
  renderFeaturedReviews();
  renderAirlines();
  initReveal();

  const form = document.getElementById('flight-search-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const fromCity = document.getElementById('from-city').value;
      const toCity = document.getElementById('to-city').value;
      const budget = document.getElementById('budget-level').value;
      renderBestFlightResult(fromCity, toCity, budget);
    });
    renderBestFlightResult('Madrid', 'Lisboa', 'all');
  }

  const filterButtons = document.querySelectorAll('[data-filters] .filter-btn');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const selected = button.textContent.trim().toLowerCase();
      const filtered = selected === 'todo'
        ? destinations
        : destinations.filter((item) => item.category === selected || item.vibe.toLowerCase().includes(selected));

      renderDestinations(filtered);
    });
  });
});
