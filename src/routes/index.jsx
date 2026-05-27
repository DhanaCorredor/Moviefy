import { Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import WelcomePage from '../pages/WelcomePage/WelcomePage'
import ExplorationPage from '../pages/ExplorationPage/ExplorationPage'
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import MovieDetailPage from '../pages/MovieDetailPage/MovieDetailPage'
import PersonDetailPage from '../pages/PersonDetailPage/PersonDetailPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import { ROUTES } from '../constants/urls'

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
      <Route element={<Layout />}>
        <Route path={ROUTES.EXPLORATION} element={<ExplorationPage />} />
        <Route path={ROUTES.MOVIE_DETAIL} element={<MovieDetailPage />} />
        <Route path={ROUTES.PERSON_DETAIL} element={<PersonDetailPage />} />
        <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
