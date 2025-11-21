export default function LeagueCard({ league, onOpen }) {
  return (
    <button onClick={() => onOpen(league)} className="text-left w-full group">
      <div className="bg-slate-800/60 border border-white/10 rounded-xl p-5 hover:border-blue-500/40 transition">
        <div className="flex items-center gap-4">
          <img src={league.avatar || 'https://images.unsplash.com/photo-1519865093634-45bad7df7c09?q=80&w=400&auto=format&fit=crop'} alt="avatar" className="w-14 h-14 rounded-lg object-cover" />
          <div className="flex-1">
            <p className="text-white font-semibold">{league.name}</p>
            <p className="text-slate-300 text-sm line-clamp-2">{league.description || 'Pickup league with friends'}</p>
            <div className="mt-2 text-xs text-slate-400">{league.location || 'Anywhere'} • Code: {league.code}</div>
          </div>
        </div>
      </div>
    </button>
  )
}
