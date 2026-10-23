
"use strict";

// ========================================
// CONFIGURACION DE LOS DESTINOS
// ========================================

const stops = [
  {
    icon: "⌂",
    number: "PUNTO DE PARTIDA",
    title: "Aquí comienza todo",
    description:
      "A la 1:00 p. m. empieza nuestra pequeña aventura. " +
      "Solo necesitas estar lista, traer buen ánimo " +
      "y dejarte sorprender por lo que viene.",
    extra: "📍 San Isidro · 1:00 p. m."
  },

  {
    icon: "🍽",
    number: "PRIMER DESTINO",
    title: "Una mesa entre jardines",
    description:
      "Nuestra primera parada será en un lugar donde " +
      "la historia, los jardines y la buena comida se encuentran. " +
      "Una tarde para disfrutar sin prisas, conversar " +
      "y celebrar como se debe.",
    extra: "📍 Museo Larco · Almuerzo especial"
  },

  {
    icon: "☀",
    number: "SEGUNDO DESTINO",
    title: "Un poquito de aire libre",
    description:
      "Después de comer, nos espera un lugar donde " +
      "el viento, el mar y una bonita vista podrían " +
      "ser los protagonistas. " +
      "Tal vez encontremos algo dulce por el camino. " +
      "El resto dependerá de nuestra curiosidad.",
    extra: "🌅 Una vista bonita, un paseo y quizás un helado"
  },

  {
    icon: "✦",
    number: "TERCER DESTINO",
    title: "Que comience la función...",
    description:
      "Hay historias que no se cuentan de la manera habitual. " +
      "Algunas nos sorprenden, otras nos hacen pensar " +
      "y unas cuantas nos hacen reír sin parar. " +
      "Esta noche nos espera algo que teníamos pendiente. " +
      "Hasta aquí llegan las pistas.",
    extra: "🎟 Una sorpresa reservada para esta noche"
  },

  {
    icon: "??",
    number: "DESTINO DESCONOCIDO",
    title: "El final aún no está escrito",
    description:
      "¿Algo rico para comer? ¿Una bebida? " +
      "¿Un lugar nuevo por descubrir? " +
      "No todo tiene que estar planeado. " +
      "Esta última parada la decidiremos juntos, " +
      "según lo que nos provoque en ese momento.",
    extra: "📍 Destino: ¿? · Decisión pendiente"
  }
];

// ========================================
// ELEMENTOS DE LA PAGINA
// ========================================

const welcome = document.getElementById("welcome");
const experience = document.getElementById("experience");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModalBtn = document.getElementById("closeModal");
const continueBtn = document.getElementById("continueBtn");

const modalNumber = document.getElementById("modalNumber");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalDescription =
  document.getElementById("modalDescription");
const modalExtra = document.getElementById("modalExtra");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const stopButtons = document.querySelectorAll(".stop");
const mapCanvas = document.querySelector(".map-canvas");

// ========================================
// ESTADO
// ========================================

const visited = new Set();
let currentStop = 0;

// ========================================
// COMENZAR EXPERIENCIA
// ========================================

startBtn.addEventListener("click", () => {
  welcome.classList.add("hidden");
  experience.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "instant" });

  // Iniciar la animacion de la ruta
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      mapCanvas.classList.add("animated");
    });
  });
});

// ========================================
// ABRIR UNA PARADA
// ========================================

function openStop(index) {
  const stop = stops[index];
  if (!stop) return;

  currentStop = index;

  modalNumber.textContent = stop.number;
  modalIcon.textContent = stop.icon;
  modalTitle.textContent = stop.title;
  modalDescription.textContent = stop.description;
  modalExtra.textContent = stop.extra;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  visited.add(index);
  stopButtons[index].classList.add("visited");

  updateProgress();

  continueBtn.textContent =
    index === stops.length - 1
      ? "Volver al recorrido"
      : "Seguir descubriendo →";

  closeModalBtn.focus();
}

// ========================================
// ACTUALIZAR PROGRESO
// ========================================

function updateProgress() {
  const total = stops.length;
  const completed = visited.size;
  const percentage = (completed / total) * 100;

  progressBar.style.width = percentage + "%";

  progressText.textContent =
    `${completed} de ${total} destinos explorados`;
}

// ========================================
// CERRAR VENTANA
// ========================================

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

// ========================================
// EVENTOS DE LOS BOTONES
// ========================================

stopButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.stop);
    openStop(index);
  });
});

closeModalBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

continueBtn.addEventListener("click", () => {
  closeModal();

  // No se abre automáticamente el siguiente destino:
  // Valeria puede elegir qué símbolo explorar.
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// ========================================
// REINICIAR
// ========================================

restartBtn.addEventListener("click", () => {
  visited.clear();

  stopButtons.forEach((button) => {
    button.classList.remove("visited");
  });

  updateProgress();

  mapCanvas.classList.remove("animated");
  experience.classList.add("hidden");
  welcome.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "instant" });
});
