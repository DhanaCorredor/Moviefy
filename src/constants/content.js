export const content = {
  welcome: {
    logoAlt: 'Logotipo de Moviefy',
    title: 'Moviefy',
    headline: 'Empieza a disfrutar de las mejores películas y series en un solo lugar.',
    subtitle: 'Todo el entretenimiento que buscas, adaptado a ti.',
    cta: 'Explorar Películas',
    disclaimer: 'La disponibilidad de los títulos varía según el país. Mayor de 18 años.',
    footer: '© Moviefy Platform',
  },
  exploration: {
    title: 'Exploración de películas',
  },
  underConstruction: {
    title: 'En construcción',
    message: 'Esta sección estará disponible próximamente.',
  },
  nav: {
    ariaLabel: 'Navegación principal',
    home: 'Inicio',
    exploration: 'Explorar',
    favorites: 'Favoritas',
    profile: 'Perfil',
    logoAlt: 'Logotipo de Moviefy',
    brand: 'Moviefy',
    searchAriaLabel: 'Buscar',
    notificationsAriaLabel: 'Notificaciones',
    profileMenuAriaLabel: 'Menú de perfil',
  },
  footer: {
    ariaLabel: 'Pie de página',
    copyright: '© 2026 Moviefy Platform',
    tmdbAttribution:
      'Este producto utiliza la API de TMDB, pero no está respaldado ni certificado por TMDB.',
  },
  states: {
    loading: 'Cargando películas…',
    emptyTitle: 'No hay películas',
    emptyMessage: 'No encontramos resultados. Prueba con otra búsqueda u otro filtro.',
    errorTitle: 'Algo salió mal',
    errorMessage: 'No pudimos cargar las películas. Vuelve a intentarlo.',
    retry: 'Reintentar',
  },
  movies: {
    posterAlt: (title) => `Cartel de ${title}`,
    noPoster: 'Sin cartel',
    noYear: 'Año desconocido',
    ratingAriaLabel: (rating) => `Puntuación ${rating} sobre 10`,
  },
}
