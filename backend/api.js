// Función para cambiar de subpágina
function showPage(pageId) {
  // Ocultar todas las secciones
  document.querySelectorAll('.page-content').forEach(page => {
    page.classList.remove('active-page');
  });

  // Quitar estado activo de los botones
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Mostrar la subpágina seleccionada
  const selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.classList.add('active-page');
  }

  //Marcar el botón correspondiente como activo
  if (pageId === 'reviews-page') document.querySelectorAll('.nav-btn')[0].classList.add('active');
  if (pageId === 'login-page') document.querySelectorAll('.nav-btn')[1].classList.add('active');
}