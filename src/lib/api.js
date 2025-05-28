// src/lib/api.js

// ——————————————————————————————————————————————————————————————————
// 1. Web-App para Catálogo / Noticias / Training
// ——————————————————————————————————————————————————————————————————
const BASE_CATALOG_URL = 
  "https://script.google.com/macros/s/AKfycbweZz-pelhvAX0BBqOPqoTyuve-9f4PeednshjxexzfnioWAokoUxokPTvtIdORlel5bQ/exec";

// Lee el catálogo completo (apps)
export const fetchCatalog  = () => 
  fetch(`${BASE_CATALOG_URL}?sheet=Aplicaciones`).then(res => res.json());

// Lee las noticias
export const fetchNews     = () => 
  fetch(`${BASE_CATALOG_URL}?sheet=Noticias`).then(res => res.json());

// Lee los trainings/capacitaciones
export const fetchTraining = () => 
  fetch(`${BASE_CATALOG_URL}?sheet=Training`).then(res => res.json());

// Crear o actualizar una app en el catálogo
export const saveApp = (app) =>
  fetch(`${BASE_CATALOG_URL}?sheet=Aplicaciones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(app),
  }).then(res => res.json());

// Crear o actualizar una noticia
export const saveNews = (item) =>
  fetch(`${BASE_CATALOG_URL}?sheet=Noticias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then(res => res.json());

// Borrar una app
export const delApp = (id) =>
  fetch(`${BASE_CATALOG_URL}?sheet=Aplicaciones&id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  }).then(res => res.json());

// Borrar una noticia
export const delNews = (id) =>
  fetch(`${BASE_CATALOG_URL}?sheet=Aplicaciones&id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  }).then(res => res.json());


// ——————————————————————————————————————————————————————————————————
// 2. Web-App para Registro de Problemas (Incidencias/Tickets)
// ——————————————————————————————————————————————————————————————————
const BASE_PROBLEMS_URL =
  "https://script.google.com/macros/s/AKfycbwV05CK1yp_TOvbcZWcIXFbUrPDgtPrBZVOZggU8epucIc_21cNaSLk_55TUptNXeetiQ/exec";

// Lee todas las incidencias ("Registro de Problemas")
export const fetchTickets = () =>
  fetch(`${BASE_PROBLEMS_URL}?sheet=Registro de Problemas`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    });


