# 🎬 Moviefy

*✨ Single Page Application para cinéfilos · Bootcamp FemCoders · Factoría F5*

> 🎭 Explora, descubre películas, actores y directores. Crea tu colección personal de favoritas con tus propias puntuaciones.

---

## 📇 Datos del proyecto

|  |  |
|---|---|
| 🎬 **Nombre** | Moviefy |
| 👩‍💻 **Autora** | Dhana Corredor |
| 🎓 **Bootcamp** | FemCoders — Factoría F5 |
| 📦 **Tipo** | Proyecto individual final |
| 📅 **Inicio** | Mayo 2026 |
| ⏳ **Duración** | 2 semanas |
| 🧠 **Metodología** | Extreme Programming + Kanban |
| 🎚️ **Nivel** | Front-End Intermedio |
| 🌐 **API externa** | The Movie Database (TMDB) |
| 🚀 **Despliegue** | Netlify *(a confirmar)* |
| 🟢 **Estado** | En desarrollo · Fase 0 (Cimientos) |

---

## 🎯 Objetivo

Construir una **Single Page Application** que ofrezca a cualquier persona usuaria:

- 🔎 Búsqueda y descubrimiento de películas en tiempo real.
- 📄 Fichas detalladas de películas, actores y directores con navegación cruzada.
- ⭐ Colección personal de favoritas con puntuaciones del 1 al 10.
- 🔐 Cuenta personal con email + contraseña para que su colección sea privada y persistente.

Todo consumiendo datos reales de **TMDB**, con experiencia **fluida, responsive y testeada** desde el primer commit.

---

## ✨ Características principales

### 🔍 Exploración (Nivel I · ✅ comprometido)

- ♾️ **Scroll infinito** con carga progresiva sin perder posición.
- 🔎 **Búsqueda en tiempo real** con debounce de 300 ms.
- 🎛️ **Filtros** por género, puntuación mínima y tendencia.
- 🟦 **Grid responsive** · 1 col móvil / 4-5 cols desktop.

### 📄 Fichas y navegación (Nivel I · ✅ comprometido)

- 🔗 **URLs únicas** y compartibles para cada película, actor y director.
- 🎬➡️🎭 **Navegación cruzada** entre entidades relacionadas.
- 🔍 `NotFoundPage` para rutas inválidas o entidades inexistentes.

### 🔐 Autenticación (Nivel II · 🟡 arquitectura preparada)

- 🚪 **Login** + ✍️ **Signup** como rutas separadas (patrón Netflix-style).
- 🔒 **Hashing SHA-256** vía `crypto.subtle.digest()` — passwords nunca en plano.
- 🛡️ **Rutas protegidas** con redirect automático a `/login`.
- 🔄 Sesión persistente en `localStorage`, contrato swappable a Firebase Auth.

### ⭐ Favoritos personales (Nivel II · 🟡 arquitectura preparada)

- ⭐ Toggle favorita desde `MovieCard` y `MovieDetailPage`.
- 🔢 Puntuación personal **1–10** con validación.
- 👥 Lista por usuario (clave `moviefy_favorites_<email>`).
- 🔄 Sincronía global vía `FavoritesContext`.

### 🎨 Calidad y UX

- 📱 **Mobile-first** con bottom nav móvil + top nav desktop.
- 🌑 **Tema oscuro** · acento morado `#5D2CD5` · radius 8px (paleta y design tokens documentados en el plan de trabajo).
- 🧪 **Testing unitario** con escenarios escritos en Gherkin (~30 escenarios).
- 🧱 **Atomic Design** · servicios centralizados por dominio (`tmdb`, `auth`, `favorites`) · contextos globales · rutas privadas con `ProtectedRoute`.
- ♿ Accesibilidad: `alt`, labels en formularios, navegación por teclado.

---

## 🎚️ Alcance

> 💡 **El plan está diseñado escalable a Nivel II y III, pero la entrega comprometida del Sprint 1-2 es Nivel I funcional completo.** La arquitectura de servicios y contextos está preparada para activar Nivel II sin refactorizar componentes — solo añadir los módulos correspondientes.

| Nivel | Contenido | Estado |
|---|---|---|
| **I** | 🔍 Exploración + 📄 Fichas detalladas + 🔗 Rutas dinámicas | ✅ **Entrega comprometida** (Sprint 1-2) |
| **II** | 🔐 Autenticación + ⭐ Favoritos + 🔢 Puntuaciones (localStorage) | 🟡 **Arquitectura preparada** · ejecución si queda tiempo |
| **III** | 🔥 Migración a Firebase Auth + ☁️ Sync de favoritos en cloud | ⚪ **Roadmap futuro** |

🧩 **Por qué este planteamiento:** demuestra pensamiento arquitectónico (los servicios `auth.js` y `favorites.js` se diseñan swappable desde el inicio) y al mismo tiempo entrega un MVP funcional realista en 2 semanas. Cumple el briefing de Factoría F5 sin sobre-comprometerse.

---

## 🛠️ Stack tecnológico

🎨 **Frontend**: React 19 · Vite 6 · JSX · HTML5 semántico
🖌️ **Estilos**: Tailwind CSS · Mobile-first con 2 breakpoints
🛣️ **Enrutado**: React Router v7
🌐 **Datos**: Fetch API + TMDB · servicio único centralizado
🔐 **Seguridad**: Web Crypto API (`crypto.subtle.digest` SHA-256)
🧪 **Testing**: Vitest · React Testing Library · jsdom
🛠️ **Herramientas**: pnpm 10 · Git + GitHub (Git Flow) · ESLint
🚀 **Despliegue**: Netlify *(a confirmar al deploy)*

---

## 📅 Cronograma · 6 fases en 2 semanas

| Fase | Nombre | Duración | Sprint | Alcance |
|:---:|---|:---:|:---:|:---:|
| 0️⃣ | 🧱 Cimientos | 1 día | Pre-sprint | ✅ Base |
| 1️⃣ | 🔍 Exploración | 3-4 días | Sprint 1 | ✅ Nivel I |
| 2️⃣ | 🔐 Autenticación | 2 días | Sprint 1 | 🟡 Nivel II |
| 3️⃣ | 📄 Fichas detalladas | 2-3 días | Sprint 2 | ✅ Nivel I |
| 4️⃣ | ⭐ Favoritos | 2 días | Sprint 2 | 🟡 Nivel II |
| 5️⃣ | 🎨 Pulido y despliegue | 1-2 días | Sprint 2 | ✅ Cierre |

⏱️ **Total estimado**:
- Nivel I solo (Fases 0+1+3+5): ~7-10 días → entrega comprometida.
- Nivel I + II completo (todas las fases): ~11-14 días → ampliación si el tiempo lo permite.

---

## 📦 Entregables

| Entregable | Enlace |
|---|---|
| 📂 **Repositorio GitHub** | https://github.com/DhanaCorredor/Moviefy |
| 🚀 **App desplegada** | *Disponible al cierre del Sprint 2* |
| 📘 **README.md** | En el repositorio · instalación, stack, capturas, deploy |
| 📑 **Plan de trabajo detallado** | *Enlazar página Notion* |
| 📄 **Documentación funcional y técnica** | *Enlazar página Notion* |
| 🏗️ **Arquitectura de lógica y flujos** | *Enlazar página Notion* |
| 📋 **Product backlog con estimaciones** | *Enlazar página Notion* |
| 🗂️ **Tablero Kanban + Sprint backlog** | *Enlazar página Notion* |
| 🗺️ **User flow + flowcharts de algoritmo** | *Enlazar sección Notion* |
| 🎨 **Mockups · Figma** | https://www.figma.com/proto/aTbK6exWJlROQHZKAbsGrz/Moviefy |
| 🧱 **Design System (Sticker Sheet)** | *Enlazar URL Figma* |
| 🎤 **Presentación final (10 min)** | *Disponible tras la defensa* |

---

## ✅ Requisitos técnicos cubiertos

- [x] SPA con React
- [x] Despliegue en plataforma estática (Netlify)
- [x] Git Flow para control de versiones (`main` · `develop` · `feature/*`)
- [x] Testing unitario con escenarios Gherkin
- [x] Código limpio, semántico y bien indentado
- [x] Librería de estilos (Tailwind con paleta propia)
- [x] Mobile-first con 2 breakpoints (`<md` y `md+`)
- [x] Compatibilidad multi-navegador (Chrome · Firefox · Safari · Edge)
- [x] Consumo de TMDB
- [x] Único servicio centralizado de API (`services/tmdb.js`)
- [x] Configuración global para textos (`config/texts.js`)
- [x] URL única por vista/página
- [x] Autenticación con email + contraseña hasheada *(Nivel II)*

---

## ⚠️ Riesgos clave

| 🚨 Riesgo | 🛡️ Mitigación |
|---|---|
| 🔥 Auth real con BaaS exigida por la mentora | `services/auth.js` diseñado swappable a Firebase Auth sin tocar componentes |
| 🚫 API key TMDB bloqueada | OMDb como fallback documentado |
| 🧪 Bloqueo en testing | Tests sencillos desde Fase 0, no acumular para el final |

📋 *Riesgos secundarios y mitigaciones detalladas en el plan de trabajo.*

---

## 🎬 Próximo hito

➡️ **Cerrar Fase 0** con dependencias instaladas, paleta aplicada en Tailwind, primer test pasando y commit inicial en `main` + rama `develop` creada.

Después: arrancar **Sprint 1** con **Fase 1 (Exploración)** — primera entrega de Nivel I.

---

## 👩‍💻 Autora

**Dhana Corredor**
🎓 Bootcamp FemCoders · Factoría F5 · 2026
🔗 https://github.com/DhanaCorredor

---

## ➡️ Otros recursos

- 🗺️ [Plan de trabajo · Moviefy](https://www.notion.so/Plan-de-trabajo-Moviefy-36254980d2348036a663d44b70347138?pvs=21)
- 📄 [Documentación funcional y técnica · Moviefy](https://www.notion.so/Documentaci-n-funcional-y-t-cnica-Moviefy-36254980d23480799f9ec5b78c012aec?pvs=21)
- 🏗️ [Arquitectura de lógica y flujos](https://www.notion.so/Documentaci-n-del-Sistema-Arquitectura-de-L-gica-y-Flujos-36454980d234808b8cc1d924a2b90b5c?pvs=21)
