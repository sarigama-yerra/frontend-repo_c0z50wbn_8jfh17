import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { PublicLeaguesShowcase } from './components/LeaguePages'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <Hero />
      <PublicLeaguesShowcase />
    </div>
  )
}

export default App
