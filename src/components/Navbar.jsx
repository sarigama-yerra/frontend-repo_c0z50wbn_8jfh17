import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-white font-bold text-lg">JustPlay</span>
          <span className="text-xs text-blue-300">League Manager</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="text-slate-200 hover:text-white">Home</Link>
          <Link to="/leagues" className="text-slate-200 hover:text-white">Leagues</Link>
          <Link to="/create" className="text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-md">Create</Link>
        </nav>
      </div>
    </header>
  )
}
