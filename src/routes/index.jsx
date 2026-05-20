import { Route, Routes } from 'react-router-dom'
import WelcomePage from '../pages/WelcomePage/WelcomePage'
import ExplorationPage from '../pages/ExplorationPage/ExplorationPage'
import { ROUTES } from '../constants/urls'

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
      <Route path={ROUTES.EXPLORATION} element={<ExplorationPage />} />
    </Routes>
  )
}

export default AppRoutes
