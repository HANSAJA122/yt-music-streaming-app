import { LogOut, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function TopBar({ query, setQuery }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 mb-4 flex items-center justify-between gap-4 rounded-xl glass p-3">
      <div className="flex w-full max-w-xl items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
        <Search size={18} className="text-zinc-400" />
        <input
          placeholder="Search songs, artists, albums, playlists"
          value={query}
          onChange={(e) => setQuery?.(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?q=${encodeURIComponent(query)}`)}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right md:block">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-zinc-400">{user?.email}</p>
        </div>
        <button onClick={logout} className="rounded-lg bg-white/10 p-2 hover:bg-white/20" title="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
