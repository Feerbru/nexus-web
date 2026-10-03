
document.addEventListener('DOMContentLoaded', () => {
  console.log('NEXUS Learning Hub - Inicializado en Modo Oscuro.');

  // Resaltar enlace de navegación según página activa
  highlightActiveNavLink();

  // Botón Volver Arriba
  initBackToTop();

  // Animaciones discretas al hacer scroll
  initScrollReveal();

  // Consejo del Día aleatorio (en index.html)
  initConsejoDelDia();

  // Buscador dinámico de recursos (en recursos.html)
  initBuscadorRecursos();

  // Filtro de proyectos por categoría (en proyectos.html)
  initFiltroProyectos();

  // Movimiento 3D interactivo
  initAntigravityMotion();
});

/**
 * Resalta el enlace activo de la barra de navegación.
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Lógica para el botón flotante "Volver arriba".
 */
function initBackToTop() {
  const btnTop = document.getElementById('btn-top');
  if (!btnTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btnTop.classList.add('show');
    } else {
      btnTop.classList.remove('show');
    }
  });

  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Revelado de elementos al hacer scroll con IntersectionObserver.
 */
function initScrollReveal() {

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Muestra un Consejo del Día aleatorio al recargar la página en index.html.
 */
function initConsejoDelDia() {
  const consejoContainer = document.getElementById('consejo-texto');
  const consejoAutor = document.getElementById('consejo-autor');
  if (!consejoContainer) return;

  const consejos = 
  [
    { texto: "No intentes memorizar cada propiedad de CSS. Lo importante es entender cómo funciona el Modelo de Caja y Flexbox.", autor: "Consejo de Maquetación" },
    { texto: "Usa console.log() para inspeccionar tus variables paso a paso cuando un script de JavaScript no funcione como esperas.", autor: "Consejo de Depuración" },
    { texto: "Escribe HTML semántico desde el primer día. Las etiquetas como <header>, <nav> y <main> hacen tu código accesible y limpio.", autor: "Buenas Prácticas" },
    { texto: "Haz commits pequeños y descriptivos en Git. Te salvarán la vida cuando necesites revisar qué cambios hiciste en tu código.", autor: "Consejo de Versionado" },
    { texto: "El diseño Responsive no es opcional. Siempre prueba cómo se ve tu sitio en pantallas de celular antes de darlo por terminado.", autor: "Diseño Web Moderno" }
  ];

  // Selección aleatoria de un índice
  const randomIndex = Math.floor(Math.random() * consejos.length);
  const consejoElegido = consejos[randomIndex];

  consejoContainer.textContent = `"${consejoElegido.texto}"`;
  if (consejoAutor) consejoAutor.textContent = `— ${consejoElegido.autor}`;
}

/**
 * Buscador simple para filtrar las tarjetas de recursos en tiempo real
 */
function initBuscadorRecursos() 
{
  const searchInput = document.getElementById('search-recursos');
  const resourceCards = document.querySelectorAll('.resource-card-item');

  if (!searchInput || resourceCards.length === 0) return;

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    resourceCards.forEach(card => {
      const title = card.getAttribute('data-title')?.toLowerCase() || '';
      const desc = card.getAttribute('data-desc')?.toLowerCase() || '';

      if (title.includes(searchTerm) || desc.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/**
 * Filtro interactivo de proyectos por dificultad (en proyectos.html).
 */
function initFiltroProyectos() {
  const filterButtons = document.querySelectorAll('.btn-filter');
  const projectItems = document.querySelectorAll('.project-item');

  if (filterButtons.length === 0 || projectItems.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'btn-nexus-primary');
        b.classList.add('btn-nexus-outline');
      });

      btn.classList.add('active', 'btn-nexus-primary');
      btn.classList.remove('btn-nexus-outline');

      const filterValue = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}


/**
 * Efecto Antigravity 3D interactivo con el cursor:
 * - Perspectiva e inclinación 3D precisa (rotateX, rotateY).
 * - Desplazamiento magnético suave (zero gravity drift).
 * - Resplandor de luz dinámico (radial spotlight glare).
 * - Parallax multi-capa en elementos flotantes orbitales con data-depth.
 * - Interpolación lineal (lerp) a 60/120fps y retorno elástico al reposo.
 */
function initAntigravityMotion() {
  const containers = document.querySelectorAll('[data-antigravity="true"]');
  if (containers.length === 0) return;

  // Respetar preferencia de accesibilidad contra mareos o animaciones
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Solo aplicar tracking interactivo si el dispositivo cuenta con puntero/mouse
  const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasPointer) return;

  containers.forEach(container => {
    const card = container.querySelector('.antigravity-card') || container;
    const glare = container.querySelector('.card-glare');
    const floatingChips = container.querySelectorAll('[data-depth]');

    const maxTilt = parseFloat(container.getAttribute('data-tilt-max')) || 14;
    const maxDrift = parseFloat(container.getAttribute('data-drift-max')) || 10;

    let rect = null;
    let isHovering = false;
    let rafId = null;

    // Valores interpolados (actuales) y objetivo
    let curRotX = 0;
    let curRotY = 0;
    let curDriftX = 0;
    let curDriftY = 0;

    let targetRotX = 0;
    let targetRotY = 0;
    let targetDriftX = 0;
    let targetDriftY = 0;

    let glareX = 50;
    let glareY = 50;

    function updateRect() {
      rect = container.getBoundingClientRect();
    }

    function onMouseEnter(e) {
      isHovering = true;
      updateRect();
      container.classList.add('antigravity-active');
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(animate);
    }

    function onMouseMove(e) {
      if (!rect) updateRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Coordenadas normalizadas [-1, 1] respecto al centro del contenedor
      const normX = ((mouseX / rect.width) - 0.5) * 2;
      const normY = ((mouseY / rect.height) - 0.5) * 2;

      // Clamp por seguridad si el cursor sale milimétricamente
      const clampedX = Math.max(-1, Math.min(1, normX));
      const clampedY = Math.max(-1, Math.min(1, normY));

      // Inversión en eje X para inclinación natural en 3D
      targetRotX = -clampedY * maxTilt;
      targetRotY = clampedX * maxTilt;

      // Desplazamiento magnético cero gravedad (drift)
      targetDriftX = clampedX * maxDrift;
      targetDriftY = clampedY * maxDrift;

      // Porcentaje de posición del glare
      glareX = Math.max(0, Math.min(100, (mouseX / rect.width) * 100));
      glareY = Math.max(0, Math.min(100, (mouseY / rect.height) * 100));
    }

    function onMouseLeave() {
      isHovering = false;
      targetRotX = 0;
      targetRotY = 0;
      targetDriftX = 0;
      targetDriftY = 0;
      container.classList.remove('antigravity-active');
    }

    function animate() {
      // Coeficiente de interpolación suave (lerp)
      const lerpSpeed = isHovering ? 0.085 : 0.06;

      curRotX += (targetRotX - curRotX) * lerpSpeed;
      curRotY += (targetRotY - curRotY) * lerpSpeed;
      curDriftX += (targetDriftX - curDriftX) * lerpSpeed;
      curDriftY += (targetDriftY - curDriftY) * lerpSpeed;

      // Aplicar transformación 3D al elemento principal
      card.style.transform = `perspective(1000px) rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg) translate3d(${curDriftX.toFixed(2)}px, ${curDriftY.toFixed(2)}px, 15px)`;

      // Actualizar reflejo dinámico de luz
      if (glare) {
        glare.style.background = `radial-gradient(circle 280px at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(56, 189, 248, 0.28) 0%, rgba(37, 99, 235, 0.1) 40%, transparent 80%)`;
      }

      // Parallax en profundidad 3D para cada chip orbital
      floatingChips.forEach(chip => {
        const depth = parseFloat(chip.getAttribute('data-depth')) || 40;
        const factor = depth / 35;
        const pX = curDriftX * factor * 1.5;
        const pY = curDriftY * factor * 1.5;
        chip.style.transform = `translate3d(${pX.toFixed(2)}px, ${pY.toFixed(2)}px, ${depth}px)`;
      });

      // Si el cursor salió y el contenedor ya regresó al reposo, finalizar el loop
      const isSettled =
        Math.abs(curRotX) < 0.02 &&
        Math.abs(curRotY) < 0.02 &&
        Math.abs(curDriftX) < 0.02 &&
        Math.abs(curDriftY) < 0.02;

      if (!isHovering && isSettled) {
        curRotX = 0;
        curRotY = 0;
        curDriftX = 0;
        curDriftY = 0;
        card.style.transform = '';
        floatingChips.forEach(chip => chip.style.transform = '');
        return;
      }

      rafId = requestAnimationFrame(animate);
    }

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });
  });
}

