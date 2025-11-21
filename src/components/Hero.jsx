import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_90%_30%,rgba(16,185,129,0.2),transparent_35%)]" />
      <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Basketball with Friends
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-8">
            Create casual leagues, invite friends, schedule games, track scores, and climb the standings. Simple, social, and mobile-friendly.
          </p>
          <div className="flex gap-3">
            <Link to="/create" className="px-5 py-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium">Create a League</Link>
            <Link to="/leagues" className="px-5 py-3 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium">Explore Leagues</Link>
          </div>
        </div>
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-2 gap-4 text-slate-200 text-sm">
            <div className="bg-slate-900/60 rounded-lg p-4">
              <p className="font-semibold text-white">Create</p>
              <p className="opacity-80">Spin up a league in seconds</p>
            </div>
            <div className="bg-slate-900/60 rounded-lg p-4">
              <p className="font-semibold text-white">Join</p>
              <p className="opacity-80">Use a code or invite link</p>
            </div>
            <div className="bg-slate-900/60 rounded-lg p-4">
              <p className="font-semibold text-white">Schedule</p>
              <p className="opacity-80">Auto-generate matches</p>
            </div>
            <div className="bg-slate-900/60 rounded-lg p-4">
              <p className="font-semibold text-white">Standings</p>
              <p className="opacity-80">Track wins and points</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
