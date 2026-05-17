# 🎬 Moviefy · Documentación funcional y técnica

> Profundización en cómo funciona Moviefy por dentro.
> Para una visión general rápida, ver la **Ficha de proyecto** (página principal).

---

## 👥 Para quién

Moviefy está pensada para:

- 🎞️ **Cinéfilos** que quieren descubrir nuevas películas sin perder tiempo navegando entre catálogos confusos.
- 📋 **Coleccionistas** que mantienen un registro personal de lo que han visto y cómo lo valoran.
- 🧭 **Exploradores** que disfrutan saltando de un director a su filmografía, de ahí a un actor, y de ahí a otra película.

---

## 🚶 Journey principal

```
Bienvenida → Exploración → [buscar / filtrar] → Ficha de película
                                                       ↓
                                          [marcar favorita + puntuar]
                                                       ↓
                                                  Mi lista de favoritas
```

### Recorrido paso a paso

1. **Inicio**: la persona usuaria llega a la app, ve una pantalla de bienvenida con un CTA claro hacia la sección de exploración.
2. **Exploración**: visualiza películas populares en formato tarjeta (póster + título + año + puntuación).
3. **Carga progresiva**: al hacer scroll, se cargan más películas automáticamente sin perder la posición.
4. **Búsqueda**: escribe en el buscador y los resultados se actualizan en tiempo real (con debounce para no saturar la API).
5. **Filtros**: refina por género, puntuación mínima o tendencia. Los filtros activos son visibles y puede limpiarlos en un clic.
6. **Detalle**: selecciona una película → ve su ficha con sinopsis, reparto, director, fecha y tráiler.
7. **Navegación cruzada**: clic en un actor → su ficha con filmografía. Clic en otra película → vuelta al ciclo.
8. **Favoritos**: marca la película como favorita y le asigna una puntuación personal del 1 al 10.
9. **Mi colección**: accede a "Favoritas" → ve su lista personal con las puntuaciones. Puede editar o eliminar.

---

## 🏗️ Arquitectura técnica

### Estructura del proyecto

```
src/
├── components/      → UI atómica y reutilizable
│   ├── atoms/        → Button, Spinner, Badge, Rating…
│   └── movies/       → MovieCard, MovieGrid, SearchBar, FilterMenu
├── pages/           → Vistas completas (una por ruta)
├── services/        → Integración con APIs y persistencia
│   ├── tmdb.js       → Única vía de consumo de la API
│   └── favorites.js  → Gestión de localStorage
├── hooks/           → Lógica reutilizable separada de la UI
├── config/          → Textos centralizados (sin hardcoding)
├── routes/          → Definición centralizada de rutas
└── context/         → Estado global (favoritos, filtros)
```

### Principios clave

#### 🔌 Servicio único de API

> **Regla del briefing.** Todos los componentes consumen TMDB a través de `services/tmdb.js`. Ningún `fetch()` directo en componentes.

Esto garantiza:

- Un único punto donde gestionar errores, timeouts y autenticación.
- Posibilidad de cambiar el proveedor (TMDB → OMDb) sin tocar componentes.
- Transformación de la respuesta a un **modelo interno consistente** (los componentes nunca ven nombres raros tipo `poster_path` o `vote_average`).

#### 📝 Textos centralizados

> **Regla del briefing.** Todas las cadenas UI viven en `config/texts.js`.

Esto permite:

- Cambiar copy o idioma sin tocar componentes.
- Mantener consistencia en mensajes de error, estados vacíos y CTAs.

#### 🧱 Atomic Design

Los componentes se clasifican por nivel de complejidad:

| Nivel | Ejemplos | Responsabilidad |
|---|---|---|
| **Atoms** | Button, Spinner, Badge, Rating | UI mínima reutilizable |
| **Molecules** | MovieCard, SearchBar, FilterMenu | Composición de atoms |
| **Organisms** | MovieGrid, TopMenu, MovieDetailHeader | Secciones funcionales |
| **Pages** | WelcomePage, MovieDetailPage… | Vistas completas |

---

## 🧩 Funcionalidades en detalle

### 🏠 Pantalla de bienvenida

- Título destacado y descripción breve.
- Botón CTA "Explorar películas" → navega a `/exploration`.
- Diseño responsive y acceso directo sin pasos intermedios.

### 🔍 Exploración

- Listado inicial de películas populares al entrar.
- Cards con título, póster, año y puntuación pública.
- Imagen por defecto si la película carece de póster.
- Carga incremental por scroll infinito sin perder posición.
- Sin duplicados al cargar páginas adicionales.

### 🔎 Búsqueda en tiempo real

- Campo siempre visible y accesible.
- Debounce de ~300 ms para evitar peticiones excesivas.
- Resultados se sustituyen al cambiar el término.
- Limpieza de la búsqueda restaura el listado por defecto.

### 🎛️ Filtros

- Filtros por **género**, **puntuación mínima** y **tendencia**.
- Filtros activos visibles en pantalla.
- Botón para limpiar filtros individuales o todos.
- Compatibles con búsqueda activa (combinación).

### 📄 Fichas detalladas

| Entidad | Información mínima |
|---|---|
| **Película** | Título, póster, sinopsis, reparto, director, fecha, tráiler |
| **Actor/actriz** | Foto, nombre, nacionalidad, filmografía |
| **Director/a** | Foto, nombre, nacionalidad, películas dirigidas |

- URLs únicas y compartibles (`/movies/:id`, `/actors/:id`, `/directors/:id`).
- Navegación cruzada entre entidades relacionadas.
- Estado controlado si la entidad no existe (404) o falla el servicio.

### ⭐ Favoritos y puntuaciones

- Toggle de favorito en la tarjeta y en la ficha detallada.
- Puntuación personal del 1 al 10 con validación de rango.
- Listado dedicado con edición y eliminación.
- Persistencia en `localStorage`.

### 🚦 Estados de UX

| Estado | Cuándo aparece | Comportamiento |
|---|---|---|
| ⏳ **Carga inicial** | Antes de recibir los primeros resultados | Spinner centrado |
| 🔄 **Carga incremental** | Al cargar más con scroll | Indicador al final del listado |
| 📭 **Vacío** | Búsqueda/filtros sin resultados | Mensaje explicativo |
| 🏁 **Fin de resultados** | No hay más páginas | Mensaje al final |
| ❌ **Error** | Falla la API | Mensaje claro + botón de reintento |

---

## 🔌 Servicio único de API (`services/tmdb.js`)

### Endpoints de TMDB utilizados

| Endpoint | Para qué |
|---|---|
| `/movie/popular` | Catálogo inicial |
| `/search/movie` | Búsqueda por título |
| `/discover/movie` | Filtros por género, puntuación y orden |
| `/trending/movie/{time_window}` | Tendencia |
| `/movie/{id}` | Detalle de película |
| `/movie/{id}/credits` | Reparto y dirección |
| `/movie/{id}/videos` | Tráiler |
| `/person/{id}` | Detalle de actor o director |
| `/person/{id}/movie_credits` | Filmografía |
| `/genre/movie/list` | Catálogo de géneros |

### Modelo interno consistente

Toda respuesta cruda de TMDB pasa por una capa de transformación. Los componentes solo trabajan con el modelo interno:

```js
// Respuesta cruda de TMDB                Modelo interno (Moviefy)
{                                         {
  id: 27205,                                id: 27205,
  title: "Inception",                       title: "Inception",
  poster_path: "/xyz.jpg",       →          poster: "https://image.tmdb.org/.../xyz.jpg",
  release_date: "2010-07-16",               year: 2010,
  vote_average: 8.4,                        rating: 8.4,
  overview: "..."                           overview: "..."
}                                         }
```

### Manejo de errores

- **Timeout**: la petición se cancela si tarda más de N segundos.
- **Errores HTTP** (4xx, 5xx): retorno controlado.
- **Errores de red**: idem.
- Los componentes nunca ven `throw` — siempre reciben un objeto con la forma:
  ```js
  { ok: true,  data }   // éxito
  { ok: false, error }  // error
  ```

---

## 🧪 Estrategia de testing

### Mapeo Gherkin → Vitest

Cada `Scenario:` del briefing se convierte en al menos un test con el mismo nombre:

```js
describe('Exploración de películas', () => {
  it('Cargar más películas al hacer scroll', async () => {
    // Given the user is viewing the movie list
    // And there are more movies available
    // When the user scrolls near the end of the list
    // Then the system should automatically load more movies
    //  And append them to the existing list
  });
});
```

### Qué se testea

- **Servicios**: con `fetch` mockeado, verificar que devuelven el modelo correcto.
- **Hooks**: `useDebounce`, `useInfiniteScroll`, `useFavorites` con `renderHook`.
- **Componentes**: `MovieCard`, `SearchBar`, `EmptyState`, `ErrorState` y las páginas de detalle.
- **Navegación**: que las rutas dinámicas resuelvan la entidad correcta.

### Qué NO se testea

- TMDB real (siempre mockeado).
- Estilos visuales puros — no son responsabilidad de tests unitarios.

---

## 📱 Responsive y compatibilidad

### Mobile-first con 2 breakpoints

- Por defecto, todos los estilos asumen pantalla móvil (~375px).
- El prefijo `md:` activa estilos para escritorio (≥768px).

```html
<!-- 1 columna en móvil, 4 en desktop -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
```

### Navegadores soportados

Probado en **Chrome**, **Firefox**, **Safari** y **Edge** en sus versiones actuales.

---

## 🛠️ Decisiones técnicas

| Decisión | Justificación |
|---|---|
| **Vite** sobre Create React App | CRA está deprecado. Vite es más rápido, moderno y mantiene el ecosistema. |
| **React 19** | Versión estable más reciente, con hooks mejorados y mejor performance. |
| **Tailwind CSS** sobre CSS Modules puros | Velocidad de prototipado en un plazo ajustado, sin sacrificar consistencia. |
| **`localStorage`** para favoritos | Cumple el requisito de persistencia sin añadir backend. Foco 100% en frontend. |
| **`react-router-dom` v7** | Estándar de facto en el ecosistema React. URLs dinámicas y carga directa. |
| **Vitest** sobre Jest | Integración nativa con Vite, arranque más rápido, API casi idéntica. |
| **`pnpm`** sobre npm | Instalaciones más rápidas y uso eficiente de disco. |

---

## 🔮 Posibles ampliaciones (fuera de alcance actual)

Si quedara tiempo al final del segundo sprint, estas son las ampliaciones priorizadas:

- 👤 **Autenticación con BaaS** (Firebase o Supabase) — desbloquea el Nivel III del briefing.
- ☁️ **Sincronización de favoritos** entre dispositivos.
- 🌍 **Multi-idioma** (i18n con cambio dinámico).
- 🎨 **Modo claro/oscuro** seleccionable.
- 📊 **Estadísticas personales** (géneros favoritos, puntuación media).
