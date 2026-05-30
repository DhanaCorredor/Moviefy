# 🎬 Moviefy

> Single Page Application para descubrir, buscar y explorar películas, actores y directores. Consume datos reales de **The Movie Database (TMDB)**.

🚀 **Demo:** [app-moviefy.vercel.app](https://app-moviefy.vercel.app)
📚 **Wiki:** [deepwiki.com/DhanaCorredor/Moviefy](https://deepwiki.com/DhanaCorredor/Moviefy)

Proyecto individual final del bootcamp **FemCoders · Factoría F5** · 2026.

---

## ✨ Funcionalidades

- 🎞️ **Hero carrusel** en exploración con autorotación, crossfade y reproducción de tráiler en modal.
- 🔎 **Búsqueda en tiempo real** con debounce de 400 ms.
- 🎛️ **Filtros combinables** por género, puntuación mínima y tendencia.
- ♾️ **Scroll infinito** con `IntersectionObserver`, sin duplicados y preservando la posición.
- 📄 **Fichas detalladas** de películas y personas (actores y directores) con URLs únicas y navegación cruzada entre entidades relacionadas.
- 📺 **Plataformas de streaming** en la ficha de película (datos de JustWatch vía TMDB, región España).
- 🚦 **Estados de UX** diferenciados: carga, skeleton, vacío, error con reintento, fin de resultados.
- 📱 **Mobile-first responsive** con 2 breakpoints (móvil por defecto, `md:` para desktop).

---

## 🛠️ Stack

| Capa | Tecnología |
|---|---|
| Framework | **React 19** |
| Build tool | **Vite 6** |
| Routing | **React Router v7** |
| Estilos | **Tailwind CSS v4** (plugin `@tailwindcss/vite`) |
| HTTP | Fetch API nativa |
| API externa | **TMDB** (`api.themoviedb.org/v3`) · datos de streaming vía **JustWatch** |
| Persistencia | `localStorage` (próximo hito) |
| Testing | **Vitest** · React Testing Library · jsdom |
| Gestor | **pnpm** `10.13.1` |
| Deploy | **Vercel** |

---

## 🚀 Instalación local

Requisitos: **Node.js ≥ 20** y **pnpm**.

```bash
# 1. Clonar el repositorio
git clone https://github.com/DhanaCorredor/Moviefy.git
cd Moviefy

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env
# Abrir .env y añadir tu clave de TMDB

# 4. Arrancar en modo desarrollo
pnpm dev
```

La app queda disponible en `http://localhost:5173`.

### Scripts disponibles

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo con HMR |
| `pnpm build` | Build de producción a `dist/` |
| `pnpm preview` | Previsualiza el build localmente |
| `pnpm lint` | Análisis estático con ESLint |
| `pnpm test` | Tests en modo watch con Vitest |
| `pnpm test:run` | Ejecuta los tests una vez (CI) |

---

## 🔑 Variables de entorno

| Variable | Descripción |
|---|---|
| `VITE_TMDB_API_KEY` | Clave de acceso a la API de TMDB. Obtenible gratuitamente en [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api). |

> El archivo `.env` está en `.gitignore` y nunca se sube al repositorio. Se versiona `.env.example` como plantilla.

---

## 📁 Estructura del proyecto

```
src/
├── components/              # UI atómica y reutilizable
│   ├── Layout/  Navbar/  Footer/  icons/
│   ├── Spinner/  EmptyState/  ErrorState/  UnderConstruction/
│   ├── PersonImage/  DetailNotFound/
│   └── movies/              # Componentes de dominio
│       ├── HeroCarousel/    HeroCarouselSkeleton/    HeroSlide/
│       ├── MovieCard/       MovieCardSkeleton/
│       ├── MovieGrid/       MovieGridSkeleton/
│       ├── SearchBar/       FilterMenu/              TrailerModal/
├── pages/                   # Vistas completas (una por ruta)
│   ├── WelcomePage/         ExplorationPage/
│   ├── MovieDetailPage/     PersonDetailPage/
│   ├── FavoritesPage/       ProfilePage/    NotFoundPage/
├── services/
│   └── tmdb.js              # Único punto de consumo de la API
├── hooks/
│   ├── useDebounce.js       useInfiniteScroll.js    useTmdbDetail.js
├── constants/               # Configuración centralizada
│   ├── content.js           # Textos UI (español)
│   ├── filters.js           # Catálogos y helpers de filtros
│   └── urls.js              # Rutas internas y endpoints TMDB
├── routes/
│   └── index.jsx            # Definición central de rutas
└── test/
    └── setup.js             # Configuración global de Vitest
```

### Rutas de la app

| Ruta | Página |
|---|---|
| `/` | Bienvenida con hero |
| `/exploration` | Listado con hero carrusel, búsqueda, filtros y scroll infinito |
| `/movies/:id` | Ficha detallada de película |
| `/persons/:id` | Ficha detallada de persona (actor/actriz/director/a) |
| `/favorites` | Colección personal *(próximo hito)* |
| `/profile` | Perfil *(próximo hito)* |
| `*` | `NotFoundPage` |

---

## 🏗️ Decisiones de arquitectura

- **Servicio único de API** — Todo consumo de TMDB pasa por `services/tmdb.js`. Ningún `fetch()` directo en componentes. Esto permite cambiar de proveedor sin tocar la UI.
- **Modelo interno consistente** — Las respuestas crudas de TMDB se transforman a un modelo propio (`poster_path` → `posterUrl`, `vote_average` → `rating`, etc.) en `services/tmdb.js`. Los componentes nunca dependen del shape de la API externa.
- **Textos centralizados** — Todas las cadenas UI viven en `src/constants/content.js`. Cambiar copy o idioma no requiere tocar componentes.
- **Una carpeta por componente** — Estructura atómica clara, sin archivos `.css` locales. Todo el estilo se resuelve con utilidades de Tailwind.
- **Design tokens en `@theme`** — Tailwind v4 sin `tailwind.config.js`. Los tokens (`--color-primary`, `--color-background`, etc.) viven en `src/index.css`.

---

## 🧪 Testing

Tests unitarios con **Vitest** + **React Testing Library** sobre **jsdom**. Cada test se redacta partiendo de un escenario en formato Gherkin (`Given / When / Then`) tomado del briefing, y el escenario se documenta como comentario sobre el `it()` correspondiente.

```bash
pnpm test       # modo watch
pnpm test:run   # ejecución única
```

Los archivos `*.test.jsx` viven junto al componente que prueban (p. ej. `MovieCard/MovieCard.test.jsx`).

---

## 🗺️ Estado del proyecto

| Nivel | Estado | Notas |
|---|---|---|
| **Nivel I** · Exploración + fichas | ✅ Implementado | Cumple los criterios de aceptación del briefing. |
| **Nivel II light** · Favoritas + puntuación 1–10 en `localStorage` | 🟡 Próximo hito | Las rutas `/favorites` y `/profile` muestran `UnderConstruction`. |
| **Nivel III** · Autenticación BaaS | 🔮 Ampliación | Fuera de alcance del entregable inicial. |

---

## 🎨 Design system

Estética minimalista en dark mode.

| Token | Hex | Uso |
|---|---|---|
| `bg-primary` | `#5D2CD5` | CTAs, estados activos, acentos |
| `bg-background` | `#000000` | Fondo de la app |
| `bg-surface` | `#111111` | Cards, modales, navbar |
| `text-text` | `#FFFFFF` | Texto base |
| `rounded-lg` | `8px` | Radio por defecto en cards, botones e inputs |

---

## 👩‍💻 Autora

**Dhana Corredor** · Bootcamp FemCoders · Factoría F5

[GitHub](https://github.com/DhanaCorredor) · [LinkedIn](https://www.linkedin.com/in/dhanacorredor)
