import { useEffect, useMemo, useState } from 'react'
import LeagueCard from './LeagueCard'
import LeagueModal from './LeagueModal'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function CreateLeaguePage() {
  const [form, setForm] = useState({
    name: '', description: '', sport: 'basketball', location: '', start_date: '', avatar: '', number_of_teams: '', allow_free_join: true, organizer_name: ''
  })
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/leagues`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
          ...form,
          start_date: form.start_date || null,
          number_of_teams: form.number_of_teams ? Number(form.number_of_teams) : null,
        })
      })
      const data = await res.json()
      setCreated(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-4">Create a League</h2>
      <form onSubmit={onSubmit} className="bg-slate-800/50 border border-white/10 rounded-xl p-6 grid md:grid-cols-2 gap-4">
        <input className="input" name="name" placeholder="League name" value={form.name} onChange={handleChange} required />
        <input className="input" name="organizer_name" placeholder="Your name (organizer)" value={form.organizer_name} onChange={handleChange} required />
        <input className="input md:col-span-2" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input className="input" name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input className="input" type="date" name="start_date" value={form.start_date} onChange={handleChange} />
        <input className="input md:col-span-2" name="avatar" placeholder="Avatar URL" value={form.avatar} onChange={handleChange} />
        <input className="input" type="number" name="number_of_teams" placeholder="Number of teams (optional)" value={form.number_of_teams} onChange={handleChange} />
        <label className="flex items-center gap-2 text-slate-200"><input type="checkbox" name="allow_free_join" checked={form.allow_free_join} onChange={handleChange} /> Allow free join</label>
        <div className="md:col-span-2 flex gap-3">
          <button disabled={loading} className="btn-primary">{loading ? 'Creating...' : 'Create League'}</button>
          {created && <span className="text-slate-300">Created • Code: <span className="text-white font-semibold">{created.code}</span></span>}
        </div>
      </form>
    </div>
  )
}

export function LeaguesListPage() {
  const [leagues, setLeagues] = useState([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)

  const fetchLeagues = async () => {
    const res = await fetch(`${API}/api/leagues`)
    const data = await res.json()
    setLeagues(data)
  }

  useEffect(() => { fetchLeagues() }, [])

  const onOpen = (league) => { setActive(league); setOpen(true) }
  const onClose = () => setOpen(false)

  const onJoin = async (name) => {
    if (!name) return
    const res = await fetch(`${API}/api/leagues/${active.id}/join`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name })
    })
    const data = await res.json()
    setActive(data)
    setLeagues((arr) => arr.map((l) => (l.id === data.id ? data : l)))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-4">Leagues</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {leagues.map((l) => (
          <LeagueCard key={l.id} league={l} onOpen={onOpen} />
        ))}
      </div>
      <LeagueModal open={open} league={active} onClose={onClose} onJoin={onJoin} />
    </div>
  )
}

export function LeagueDetailPage({ league }) {
  const [tab, setTab] = useState('overview')
  const teams = league?.teams || []
  const members = league?.members || []

  const schedule = async () => {
    await fetch(`${API}/api/leagues/${league.id}/schedule`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rounds: 1 }) })
    // no-op; relying on mock simplicity
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <img src={league.avatar} className="w-16 h-16 rounded-lg object-cover" />
        <div>
          <h2 className="text-2xl font-bold text-white">{league.name}</h2>
          <p className="text-slate-300">{league.location} • Code: {league.code}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {['overview','teams','players','schedule','standings'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-md text-sm ${tab===t? 'bg-blue-600 text-white':'bg-white/10 text-slate-200'}`}>{t}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-4">
            <p className="text-slate-200 mb-2">{league.description}</p>
            <p className="text-slate-400 text-sm">Starts: {league.start_date || 'TBD'}</p>
          </div>
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-4">
            <p className="text-slate-200 mb-2">Members</p>
            <div className="flex flex-wrap gap-2">
              {members.map((m) => (
                <span key={m.id} className="bg-white/10 text-slate-100 px-3 py-1 rounded-full text-xs">{m.name}{m.role==='organizer'?' • Organizer':''}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'teams' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((t) => (
            <div key={t.id} className="bg-slate-800/50 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <img src={t.avatar} className="w-10 h-10 rounded-md object-cover" />
                <p className="text-white font-medium">{t.name}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(t.players||[]).map((p) => (
                  <span key={p.id} className="bg-white/10 text-slate-100 px-2 py-0.5 rounded-full text-xs">{p.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'schedule' && (
        <div className="space-y-3">
          <button onClick={schedule} className="btn-primary">Generate schedule</button>
          {/* In a fuller build we would fetch and render matches here */}
          <p className="text-slate-300 text-sm">Schedule will appear here after generation.</p>
        </div>
      )}

      {tab === 'standings' && (
        <div className="bg-slate-800/50 border border-white/10 rounded-xl">
          <div className="grid grid-cols-6 text-slate-300 text-xs uppercase tracking-wide border-b border-white/10">
            <div className="p-3">Team</div><div className="p-3">P</div><div className="p-3">W</div><div className="p-3">L</div><div className="p-3">PF</div><div className="p-3">PA</div>
          </div>
          {/* With mock data, standings need results to change; left illustrative */}
        </div>
      )}
    </div>
  )
}

export function PublicLeaguesShowcase() {
  const [leagues, setLeagues] = useState([])
  const [active, setActive] = useState(null)

  useEffect(() => {
    // Preload with some mock leagues if none exist
    const load = async () => {
      const res = await fetch(`${API}/api/leagues`)
      const data = await res.json()
      if (data.length === 0) {
        // seed two demo leagues
        await fetch(`${API}/api/leagues`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
          name: 'Downtown Runs', description: 'Tuesday night pickup at the community center', location: 'Downtown', organizer_name: 'Alex', avatar: 'https://images.unsplash.com/photo-1544911540-3bafc4f6a770?q=80&w=400&auto=format&fit=crop'
        }) })
        await fetch(`${API}/api/leagues`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
          name: 'Sunset Shooters', description: 'Weekend league for friends and neighbors', location: 'Sunset Park', organizer_name: 'Sam', avatar: 'https://images.unsplash.com/photo-1518355042338-345ec1587322?q=80&w=400&auto=format&fit=crop'
        }) })
      }
      const res2 = await fetch(`${API}/api/leagues`)
      setLeagues(await res2.json())
    }
    load()
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-white text-xl font-semibold mb-4">Popular Leagues</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {leagues.map((l) => (
          <LeagueCard key={l.id} league={l} onOpen={(league) => setActive(league)} />
        ))}
      </div>
      <LeagueModal open={!!active} league={active} onClose={() => setActive(null)} onJoin={() => {}} />
    </section>
  )
}
