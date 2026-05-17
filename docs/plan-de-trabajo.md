# 🗺️ Plan de trabajo · Moviefy

> Plan paso a paso dividido en **5 fases** para construir Moviefy en **2 semanas** de trabajo individual.
> Cada fase tiene objetivo, tareas concretas, criterios de "hecho" y estimación de tiempo.

---

## 📅 Vista general

| Fase | Nombre | Duración | Sprint |
|:---:|---|:---:|:---:|
| **0** | Cimientos del proyecto | 1 día | Pre-sprint |
| **1** | Exploración de películas | 3-4 días | Sprint 1 |
| **2** | Fichas detalladas | 2-3 días | Sprint 2 |
| **3** | Favoritos y puntuaciones | 2 días | Sprint 2 |
| **4** | Pulido y despliegue | 1-2 días | Sprint 2 |

> ⏱️ **Total estimado**: ~10 días laborables · cabe holgadamente en 2 semanas.

---

## 🧱 Fase 0 — Cimientos del proyecto

> Dejar las bases técnicas listas para que cada feature posterior sea un commit limpio.

⏱️ **Duración estimada**: 1 día
🎯 **Sprint**: Pre-sprint

### Tareas

1. **Crear repositorio en GitHub** — público, con descripción del proyecto.
2. **Inicializar proyecto React + Vite** con plantilla `react` (JavaScript).
3. **Estructura de carpetas** vacía:
   ```
   src/
   ├── components/
   ├── pages/
   ├── services/
   ├── hooks/
   ├── config/
   └── routes/
   ```
4. **Instalar dependencias** principales:
   - `react-router-dom` → enrutado
   - `tailwindcss` + plugin de Vite → estilos
   - `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` → testing
5. **Configurar Tailwind**: `tailwind.config.js`, directivas en `index.css`, primer estilo de prueba.
6. **Configurar Vitest**: archivo de setup, scripts en `package.json`, primer test que pase.
7. **Configurar React Router**: `BrowserRouter`, una ruta dummy.
8. **Variables de entorno**: `.env` con `VITE_TMDB_API_KEY`, `.env.example` versionable.
9. **Obtener API Key de TMDB** y guardarla local.
10. **Ramas Git**: crear `develop` a partir de `main`.
11. **README.md inicial** con descripción, requisitos e instalación local.
12. **Primer commit + push** a `main` y `develop`.

### ✅ Criterio de hecho

- [ ] `pnpm dev` arranca la app en `http://localhost:5173`.
- [ ] `pnpm test` ejecuta al menos un test que pasa.
- [ ] `pnpm build` genera `dist/` sin errores.
- [ ] Una clase de Tailwind se aplica correctamente en pantalla.
- [ ] El repo público existe con README, `develop` y commit inicial.

---

## 🔍 Fase 1 — Exploración de películas

> El corazón de la aplicación: ver el catálogo, buscar y filtrar.

⏱️ **Duración estimada**: 3-4 días
🎯 **Sprint**: Sprint 1

### Tareas

#### 🧰 Servicio de API

1. **`services/tmdb.js`** — punto único de consumo:
   - `getPopularMovies(page)` → listado paginado
   - `searchMovies(query, page)` → búsqueda con paginación
   - `getMoviesByFilters({ genre, minRating, sort }, page)` → filtros
   - `getGenres()` → catálogo de géneros para el menú
   - Transformación de respuesta cruda → modelo interno (`{ id, title, poster, year, rating, overview }`).
   - Manejo de errores y timeouts.

#### 🧱 Layout base

2. **`App.jsx`** con `BrowserRouter`, layout principal y outlet de rutas.
3. **`components/TopMenu`** con enlaces a Inicio, Exploración y Favoritas. Responsive (hamburguesa en móvil).

#### 🎬 Pantalla de bienvenida

4. **`pages/WelcomePage`** con título, descripción breve y CTA "Explorar películas" → navega a `/exploration`.

#### 🗂️ Pantalla de exploración

5. **`pages/ExplorationPage`** que orquesta búsqueda, filtros y listado.
6. **`components/movies/MovieGrid`** — rejilla responsive (1 col móvil, 4-5 cols desktop).
7. **`components/movies/MovieCard`** — título, póster, año, puntuación. Imagen por defecto si falta póster.

#### 🔎 Buscador

8. **`components/movies/SearchBar`** con input controlado.
9. **`hooks/useDebounce`** para retrasar la petición ~300 ms.
10. Reseteo de paginación al cambiar la búsqueda.

#### 🎛️ Filtros

11. **`components/movies/FilterMenu`** con género, puntuación mínima y tendencia.
12. Indicador visual de filtros activos + botón "Limpiar filtros".

#### ♾️ Scroll infinito

13. **`hooks/useInfiniteScroll`** con `IntersectionObserver` sobre sentinel al final del listado.
14. Deduplicación de IDs al cargar páginas adicionales.
15. Mantenimiento de la posición del scroll al añadir resultados.

#### 🎨 Estados de UX

16. **`components/atoms/Spinner`**, **`EmptyState`**, **`ErrorState`** con botón de reintento.
17. Diferenciación visual entre carga inicial (centrada) y carga incremental (al final del listado).

#### ✅ Testing

18. Tests del servicio con `fetch` mockeado.
19. Tests de `useDebounce`, `useInfiniteScroll`.
20. Tests de `MovieCard`, `SearchBar`, `EmptyState`, `ErrorState`.

### ✅ Criterio de hecho

- [ ] Al entrar a `/exploration` se ven películas populares.
- [ ] El buscador filtra resultados sin saturar la API.
- [ ] Los filtros funcionan en aislado y combinados con la búsqueda.
- [ ] El scroll infinito carga más sin perder la posición.
- [ ] Los 4 estados (loading, vacío, fin, error) son claramente distinguibles.
- [ ] Todos los `Scenario` Gherkin de la Épica 1 tienen al menos un test.

---

## 📄 Fase 2 — Fichas detalladas

> Profundizar en cada entidad y conectar el descubrimiento.

⏱️ **Duración estimada**: 2-3 días
🎯 **Sprint**: Sprint 2

### Tareas

#### 🛣️ Rutas dinámicas

1. **`routes/index.jsx`** con definición centralizada:
   ```
   /                      → WelcomePage
   /exploration           → ExplorationPage
   /movies/:id            → MovieDetailPage
   /actors/:id            → ActorDetailPage
   /directors/:id         → DirectorDetailPage
   /favorites             → FavoritesPage
   *                      → NotFoundPage
   ```
2. Navegación interna con `<Link to="..." />`. Nada de `<a>` puros.

#### 🧰 Ampliación del servicio TMDB

3. **`getMovieDetail(id)`** → sinopsis, reparto, director, fecha, tráiler.
4. **`getPersonDetail(id)`** → datos del actor o director, filmografía.
5. Transformación a modelo interno consistente.

#### 🎬 Fichas

6. **`pages/MovieDetailPage`** con:
   - Cabecera: póster + título + año + puntuación
   - Sinopsis
   - Carrusel de reparto (clic → ficha actor)
   - Director/a (clic → ficha director)
   - Tráiler embebido si está disponible
7. **`pages/ActorDetailPage`** con foto, nombre, nacionalidad, filmografía.
8. **`pages/DirectorDetailPage`** con foto, nombre, nacionalidad, películas dirigidas.

#### ⚠️ Estados

9. Estado de carga al entrar en cada ficha.
10. **`pages/NotFoundPage`** para rutas inválidas o entidades inexistentes.
11. Mensaje de error con reintento si el servicio falla.

#### ✅ Testing

12. Tests de cada página de detalle (mockeando el servicio).
13. Tests de navegación entre entidades.

### ✅ Criterio de hecho

- [ ] Cada película, actor y director tienen URL única (`/movies/:id`, etc.).
- [ ] Acceder a la URL directamente (refresh / paste) carga la entidad correcta.
- [ ] Desde una película puedes ir a un actor y desde ahí a otra película.
- [ ] Una URL inválida muestra `NotFoundPage`.
- [ ] Todos los `Scenario` Gherkin de la Épica 2 tienen al menos un test.

---

## ⭐ Fase 3 — Favoritos y puntuaciones

> El toque personal: cada usuaria construye su propio ranking.

⏱️ **Duración estimada**: 2 días
🎯 **Sprint**: Sprint 2

### Tareas

#### 💾 Persistencia

1. **`services/favorites.js`** que abstrae `localStorage`:
   - `getFavorites()` → `Array<{ id, rating? }>`
   - `addFavorite(movie)`
   - `removeFavorite(id)`
   - `setRating(id, rating)` con validación 1-10
   - `isFavorite(id)`

#### 🪝 Hook

2. **`hooks/useFavorites`** que expone el estado y mantiene sincronía con `localStorage` y con un Context global.
3. **`context/FavoritesContext`** para reflejar cambios en toda la app sin pasar props.

#### 🧩 UI

4. **`components/atoms/FavoriteToggle`** — botón estrella vacía/llena.
5. **`components/atoms/Rating`** — selector 1-10 con validación.
6. Integración del toggle en `MovieCard` y en `MovieDetailPage`.

#### 📋 Página de favoritas

7. **`pages/FavoritesPage`** con:
   - Listado con cards (reutilizando `MovieCard`)
   - Puntuación personal visible en cada card
   - Botón para editar puntuación
   - Botón para eliminar de favoritas
   - Estado vacío informativo

#### ✅ Testing

8. Tests del servicio de localStorage.
9. Tests de `useFavorites` y del contexto.
10. Tests de `FavoriteToggle`, `Rating`, `FavoritesPage`.

### ✅ Criterio de hecho

- [ ] El toggle de favorito persiste tras recargar.
- [ ] Las puntuaciones solo admiten 1-10.
- [ ] Cambios en una vista se reflejan en todas las demás (consistencia).
- [ ] La página de favoritas muestra estado vacío si no hay nada.
- [ ] Todos los `Scenario` Gherkin de la Épica 3 tienen al menos un test.

---

## 🎨 Fase 4 — Pulido y despliegue

> Lo último 10% que hace que el proyecto se entregue bien.

⏱️ **Duración estimada**: 1-2 días
🎯 **Sprint**: Sprint 2

### Tareas

#### 🎨 Diseño y UX

1. Revisión visual contra los mockups en móvil (~375px) y escritorio (~1280px).
2. Ajustes de contraste, espaciado, tipografía.
3. Estados de hover, focus y disabled en todos los elementos interactivos.
4. Accesibilidad: `alt` en todas las imágenes, labels en formularios, navegación por teclado.

#### 🌐 Cross-browser

5. Pruebas en Chrome, Firefox, Safari y Edge.
6. Corrección de cualquier diferencia visible.

#### ⚡ Optimización

7. `useMemo` en derivaciones costosas de listas filtradas.
8. Lazy loading de imágenes (atributo `loading="lazy"`).
9. Verificar que no hay warnings de React en consola.

#### 📦 Despliegue

10. Elegir plataforma (recomendado: **Netlify** por simplicidad).
11. Configurar variable de entorno `VITE_TMDB_API_KEY` en la plataforma.
12. Configurar redirección SPA (`/*` → `/index.html`) para que las rutas dinámicas funcionen tras refresh.
13. Despliegue y verificación.

#### 📚 Documentación final

14. **README.md** completo:
    - Descripción del proyecto
    - Capturas o GIF de la app
    - Stack y dependencias
    - Instalación local (`pnpm install`, `pnpm dev`)
    - Variables de entorno necesarias
    - Enlace al deploy
    - Estructura del proyecto
15. **Flowchart** de los algoritmos principales (buscador, scroll infinito, favoritos).
16. **Product backlog** con estimaciones (puede vivir en Notion).
17. **Mockups** organizados en archivo o herramienta (Figma).
18. **Design System** documentado.

#### 🎤 Presentación

19. Preparar guion de 10 minutos:
    - 3 min · Demo funcional en vivo
    - 2 min · Gestión del proyecto (Kanban, backlog, retos)
    - 5 min · Recorrido por el código

### ✅ Criterio de hecho

- [ ] La app está desplegada y funcionando online.
- [ ] Las rutas dinámicas funcionan tras refresh en producción.
- [ ] El README permite a cualquier persona clonar y arrancar el proyecto.
- [ ] Toda la documentación está enlazada en la ficha de proyecto de Notion.
- [ ] Presentación ensayada en su duración objetivo.

---

## 🚀 Buenas prácticas durante todo el proyecto

### Git Flow

```
main          ←  versiones estables (deploy)
develop       ←  integración
feature/*     ←  trabajo por feature
```

### Convención de commits

```
<verbo-infinitivo>: <qué cambia y por qué>
```

Ejemplos:
- `Añadir buscador en tiempo real con debounce de 300ms para evitar peticiones excesivas`
- `Corregir reseteo de paginación al cambiar de filtro`
- `Refactorizar servicio TMDB para devolver modelo interno consistente`

### Frecuencia

- Commits **pequeños y atómicos** — uno por unidad lógica de trabajo.
- Push a `develop` al menos una vez al día.
- Merge a `main` solo al final de cada sprint o antes de un deploy.

---

## ⚠️ Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| **Scope creep** (querer abarcar Nivel III) | Foco absoluto en Nivel I + favoritos. Nivel III solo si sobra tiempo. |
| **API key TMDB bloqueada** | Tener OMDb como fallback documentado. |
| **Bloqueo en testing** | Empezar tests sencillos pronto, no acumular para el final. |
| **Diseño tarde** | Tener mockups listos antes de empezar Fase 1, aunque sean low-fi. |
| **Atascarse en Tailwind** | Limitar la primera ronda a estilos funcionales; pulir al final. |

---

## 📌 Próxima acción

➡️ **Validar este plan con la mentora y arrancar la Fase 0.**
