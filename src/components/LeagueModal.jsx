import { useEffect, useState } from 'react'

export default function LeagueModal({ open, league, onClose, onJoin }) {
  const [name, setName] = useState('')
  useEffect(() => { setName('') }, [league])
  if (!open || !league) return null

  return (
    <div className="fixed inset-0 z-30 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-slate-900 w-full md:max-w-2xl rounded-t-2xl md:rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={league.avatar} className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <h3 className="text-white font-semibold">{league.name}</h3>
              <p className="text-slate-400 text-sm">{league.location}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white">Close</button>
        </div>

        <p className="text-slate-300 mb-4">{league.description}</p>

        <div className="bg-slate-800/40 rounded-xl p-4 border border-white/10 mb-4">
          <p className="text-slate-200 text-sm mb-2">Enter your name to join this league</p>
          <div className="flex gap-2">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="flex-1 bg-slate-900 text-white rounded-md px-3 py-2 border border-white/10 focus:outline-none focus:border-blue-500" />
            <button onClick={() => onJoin(name)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-md">Join</button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-slate-800/40 rounded-lg p-3 border border-white/10">
            <p className="text-slate-300 text-sm">Teams</p>
            <p className="text-white font-semibold">{league.teams.length}</p>
          </div>
          <div className="bg-slate-800/40 rounded-lg p-3 border border-white/10">
            <p className="text-slate-300 text-sm">Members</p>
            <p className="text-white font-semibold">{league.members.length}</p>
          </div>
          <div className="bg-slate-800/40 rounded-lg p-3 border border-white/10">
            <p className="text-slate-300 text-sm">Code</p>
            <p className="text-white font-semibold">{league.code}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
