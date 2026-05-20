# 📋 Product Backlog · Moviefy

*Backlog con estimaciones en story points · 31 issues · Sprint 1-2*

> 🏷️ **Numeración**: las issues tienen prefijo `01 ·` a `31 ·` en su título. El número de GitHub interno es secundario (#52-#82) y no se usa en este documento.

---

## 📊 Resumen ejecutivo

| Bloque | Fases | Issues | Story points | Alcance |
|---|---|:---:|:---:|:---:|
| 🎨 Diseño · Pre-sprint | Mockups + flowcharts + paleta + atomic | 7 | 28 pts | Base |
| 🧱 Cimientos técnicos · Pre-sprint | Fase 0 | 3 | 13 pts | Base |
| 🔍 Sprint 1 · Fase 1 | Exploración | 7 | 38 pts | ✅ Nivel I |
| 🔐 Sprint 1 · Fase 2 | Autenticación | 4 | 18 pts | 🟡 Nivel II |
| 📄 Sprint 2 · Fase 3 | Fichas detalladas | 3 | 17 pts | ✅ Nivel I |
| ⭐ Sprint 2 · Fase 4 | Favoritos | 3 | 13 pts | 🟡 Nivel II |
| 🎨 Sprint 2 · Fase 5 | Pulido + deploy | 4 | 13 pts | Cierre |
| **TOTAL** | | **31** | **140 pts** | |

📊 **Totales por alcance:**

- **Nivel I comprometido** (Fases 0 + 1 + 3 + 5 + diseño sin #03): **107 pts**
- **Nivel II ampliación** (Fases 2 + 4 + #03 SignupPage mockup): **+33 pts**
- **Visión escalable completa**: **140 pts**

🎯 **Velocidad objetivo**: ~50 pts/semana → Nivel I cabe en 2 semanas con buffer.

---

## 🏷️ Leyenda

**Estado** · marca el checkbox al cerrar la issue en GitHub.
**Tipo**: `feat` funcionalidad · `test` testing · `setup` configuración · `docs` documentación · `design` diseño/UX
**🟡 Nivel II**: aplazado · ejecución solo si Nivel I termina antes.

---

## 🎨 Pre-sprint · Diseño y artefactos UX

- [x] **01** · Setup repositorio + Project board · `design` · 2 pts
- [x] **02** · Mockups Figma · 5 vistas + LoginPage detallado · `design` · 7 pts
- [ ] **03** · Mockup de SignupPage 🟡 *(Nivel II)* · `design` · 2 pts
- [x] **04** · Paleta de colores oficial y design tokens · `design` · 1 pt
- [x] **05** · User flow general de navegación · `design` · 2 pts
- [x] **06** · Flowcharts de algoritmos · 5 diagramas · `design` · 11 pts
- [x] **07** · Atomic Design · Sticker Sheet · `design` · 3 pts

**Subtotal**: 28 pts · 26 hechos · 2 aplazados (Nivel II)

---

## 🧱 Pre-sprint · Fase 0 · Cimientos técnicos

- [ ] **08** · Setup técnico: Tailwind + Router + Vitest · `setup` · 7 pts
- [ ] **09** · Estructura del código: servicios placeholder + texts.js · `setup` · 3 pts
- [ ] **10** · Entorno: .env + Git Flow + README inicial · `setup` · 3 pts

**Subtotal**: 13 pts

---

## 🔍 Sprint 1 · Fase 1 · Exploración (Nivel I ✅)

- [ ] **11** · Implementar `services/tmdb.js` · `feat` · 5 pts
- [ ] **12** · Layout responsive + WelcomePage · `feat` · 5 pts
- [ ] **13** · ExplorationPage con MovieGrid + MovieCard · `feat` · 5 pts
- [ ] **14** · Buscador con debounce + filtros · `feat` · 10 pts
- [ ] **15** · Scroll infinito con IntersectionObserver · `feat` · 5 pts
- [ ] **16** · Estados UX: Spinner, EmptyState, ErrorState · `feat` · 3 pts
- [ ] **17** · Tests Gherkin de Fase 1 · `test` · 5 pts

**Subtotal**: 38 pts

---

## 🔐 Sprint 1 · Fase 2 · Autenticación 🟡 (Nivel II)

- [ ] **18** · `services/auth.js` + AuthContext + useAuth · `feat` · 7 pts
- [ ] **19** · `components/ProtectedRoute` · `feat` · 2 pts
- [ ] **20** · LoginPage + SignupPage · `feat` · 6 pts
- [ ] **21** · Tests Gherkin de Fase 2 · `test` · 3 pts

**Subtotal**: 18 pts · ampliación solo si Nivel I termina antes

---

## 📄 Sprint 2 · Fase 3 · Fichas detalladas (Nivel I ✅)

- [ ] **22** · Rutas dinámicas + ampliar `services/tmdb.js` con detalles · `feat` · 5 pts
- [ ] **23** · Fichas detalladas: Movie + Actor + Director + NotFound · `feat` · 9 pts
- [ ] **24** · Tests Gherkin de Fase 3 · `test` · 3 pts

**Subtotal**: 17 pts

---

## ⭐ Sprint 2 · Fase 4 · Favoritos 🟡 (Nivel II)

- [ ] **25** · `services/favorites.js` + FavoritesContext + useFavorites · `feat` · 5 pts
- [ ] **26** · FavoriteToggle + Rating + FavoritesPage · `feat` · 6 pts
- [ ] **27** · Tests Gherkin de Fase 4 · `test` · 2 pts

**Subtotal**: 13 pts · ampliación solo si Nivel I termina antes

---

## 🎨 Sprint 2 · Fase 5 · Pulido y despliegue

- [ ] **28** · Pulido visual + accesibilidad + cross-browser · `design` · 4 pts
- [ ] **29** · Optimización + deploy en Netlify · `setup` · 4 pts
- [ ] **30** · README.md final completo · `docs` · 2 pts
- [ ] **31** · Preparar presentación de 10 minutos · `docs` · 3 pts

**Subtotal**: 13 pts

---

## 🔗 Relación con GitHub

Este backlog vive a la vez en dos sitios:

- 📋 **Aquí (Notion / repo)** → vista visual con checkboxes para tachar a medida que avanzas.
- 🐙 **GitHub Issues** → backlog ejecutable. Cada issue lleva el mismo prefijo numérico en el título (`01 ·` a `31 ·`), descripción, criterios de aceptación, labels (`fase-X`, `tipo:Y`, `prioridad:Z`) y milestone (`Pre-sprint`, `Sprint 1`, `Sprint 2`).

Cuando cierras una issue en GitHub, vuelves aquí y marcas su checkbox.

---

## 🎯 Próximas acciones

1. ▶️ Las 5 issues de diseño hechas (`01`, `02`, `04`, `05`, `06`) ya están **Closed** en GitHub — visible como "Done" en el Kanban desde el día 1.
2. 🎨 Hacer `07 · Atomic Design · Sticker Sheet` en Figma cuando tengas un hueco (no es bloqueante para Fase 0).
3. 🏗️ Arrancar **Fase 0** con las 3 issues técnicas (`08` → `09` → `10`).
4. 🚀 Pasar a **Sprint 1 · Fase 1** (`11`–`17`) — el primer commit funcional del MVP.

---

## ↩️ Recursos relacionados

- 🎬 [Ficha de proyecto · Moviefy](./ficha-de-proyecto.md)
- 🗺️ [Plan de trabajo · Moviefy](./plan-de-trabajo.md)
- 🐙 [Repositorio GitHub](https://github.com/DhanaCorredor/Moviefy)
- 📌 [Project board (Kanban)](https://github.com/users/DhanaCorredor/projects/5)
