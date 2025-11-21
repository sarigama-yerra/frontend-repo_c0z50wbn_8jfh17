import { Routes, Route } from 'react-router-dom'
import App from '../App'
import { CreateLeaguePage, LeaguesListPage } from './LeaguePages'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create" element={<CreateLeaguePage />} />
      <Route path="/leagues" element={<LeaguesListPage />} />
    </Routes>
  )
}
