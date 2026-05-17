# 🎬 Moviefy

*Ficha de proyecto · Bootcamp FemCoders · Factoría F5*

> Aplicación web pensada para cinéfilos y amantes del cine.
> Explora, descubre y construye tu propia colección de películas favoritas.

---

## 📇 Datos del proyecto

| | |
|---|---|
| **Nombre** | Moviefy |
| **Tipo** | Proyecto individual final |
| **Bootcamp** | FemCoders — Factoría F5 |
| **Autora** | Dhana Corredor |
| **Inicio** | Mayo 2026 |
| **Duración** | 2 semanas |
| **Metodología** | Extreme Programming + Kanban |
| **Nivel** | Front-End Intermedio |
| **Estado** | 🟢 En desarrollo · Fase 0 (Cimientos) |

---

## 🎯 Objetivo

Construir una **Single Page Application** en React que permita a cualquier persona usuaria:

- 🔍 Buscar y descubrir películas en tiempo real.
- 📄 Consultar fichas detalladas de películas, actores y directores.
- ⭐ Crear y gestionar una colección personal de favoritas con puntuaciones propias.

Todo ello consumiendo datos reales de **The Movie Database (TMDB)**, con una experiencia fluida, responsive y testeada.

---

## ✨ Características principales

- ♾️ **Scroll infinito** con carga progresiva sin perder posición.
- 🔎 **Búsqueda en tiempo real** con debounce para optimizar peticiones.
- 🎛️ **Filtros** por género, puntuación mínima y tendencia.
- 🔗 **URLs únicas** para cada película, actor y director.
- 🌐 **Navegación cruzada** entre entidades relacionadas (película → actor → filmografía).
- ⭐ **Favoritos** con puntuación personal del 1 al 10, persistidos localmente.
- 📱 **Diseño responsive** mobile-first (móvil + escritorio).
- ✅ **Testing unitario** con escenarios escritos en Gherkin.
- 🎨 **Atomic Design** aplicado al sistema de componentes.

---

## 🎚️ Alcance comprometido

| Nivel | Contenido | Estado |
|:---:|---|:---:|
| **I** | Exploración + Fichas detalladas + Rutas dinámicas | ✅ Comprometido |
| **II** | Favoritos + Puntuaciones personales (localStorage) | ✅ Comprometido |
| **III** | Autenticación con BaaS + Backend propio | ❌ Fuera de alcance |

> El **Nivel III** se considera como ampliación opcional si quedan días al final del segundo sprint.

---

## 🛠️ Stack tecnológico

**Frontend**: `React 19` · `Vite 6` · `JSX` · `HTML5 semántico`

**Estilos**: `Tailwind CSS` · `Mobile-first` con 2 breakpoints

**Enrutado**: `React Router v7`

**Datos**: `Fetch API` consumiendo `TMDB`

**Testing**: `Vitest` · `React Testing Library` · `jsdom`

**Herramientas**: `pnpm` · `Git + GitHub` (Git Flow) · `ESLint`

**Despliegue**: `Netlify` *(plataforma a confirmar)*

---

## 📅 Cronograma

| Sprint | Semana | Foco |
|:---:|:---:|---|
| **Pre-sprint** | Día 0 | Cimientos, configuración inicial, repositorio |
| **Sprint 1** | Semana 1 | Exploración: catálogo, búsqueda, filtros, scroll infinito |
| **Sprint 2** | Semana 2 | Fichas detalladas + Favoritos + Pulido + Despliegue |

---

## 📦 Entregables

| Entregable | Enlace |
|---|---|
| 📂 **Repositorio** | https://github.com/DhanaCorredor/Moviefy |
| 🚀 **App desplegada** | *Disponible al finalizar el proyecto* |
| 📘 **README.md** | En el repositorio *(instalación local, stack, capturas)* |
| 📑 **Plan de trabajo detallado** | *Enlazar página Notion* |
| 📄 **Presentación del proyecto** | *Enlazar página Notion* |
| 📋 **Product backlog con estimaciones** | *Enlazar página Notion* |
| 🗂️ **Tablero Kanban + Sprint backlog** | *Enlazar página Notion* |
| 📊 **Flowchart de algoritmos** | *Enlazar URL Figma / Miro* |
| 🎨 **Mockups** | *Enlazar URL Figma* |
| 🧱 **Design System (Sticker Sheet)** | *Enlazar URL Figma* |
| 🎤 **Presentación final (10 min)** | *Disponible tras la defensa* |

---

## 📋 Requisitos técnicos cubiertos

- [x] SPA con React
- [x] Despliegue en plataforma estática
- [x] Git Flow para control de versiones
- [x] Testing unitario con Gherkin
- [x] Código limpio, semántico y bien indentado
- [x] Librería de estilos (Tailwind)
- [x] Mobile-first con 2 breakpoints
- [x] Compatibilidad multi-navegador (Chrome, Firefox, Safari, Edge)
- [x] Consumo de TMDB
- [x] Único servicio centralizado de API
- [x] Configuración global para textos
- [x] URL única por vista/página

---

## 📊 Estado actual

**Fase 0 · Cimientos del proyecto** 🟢

Progreso:

- [x] Scaffolding React + Vite
- [x] Estructura de carpetas inicial (`components/`, `services/`, `hooks/`, etc.)
- [x] Repositorio creado en GitHub
- [x] Plan de trabajo y documentación inicial
- [ ] Instalación y configuración de Tailwind, React Router y Vitest
- [ ] Variables de entorno y API Key de TMDB
- [ ] Primer commit con todo el setup base
- [ ] README.md inicial publicado

---

## 🎬 Próximo hito

➡️ **Cerrar Fase 0** con todas las dependencias instaladas, primer test pasando y primer commit en `main` + rama `develop` creada.

Después: arrancar **Sprint 1 — Exploración de películas**.

---

## 👩‍💻 Autora

**Dhana Corredor**
Bootcamp FemCoders · Factoría F5 · 2026
[github.com/DhanaCorredor](https://github.com/DhanaCorredor)
