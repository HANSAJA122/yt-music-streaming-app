import { Disc3, Heart, History, Home, Library, Search, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/library', label: 'Your Library', icon: Library },
  { to: '/liked', label: 'Liked Songs', icon: Heart },
  { to: '/recent', label: 'Recently Played', icon: History },
  { to: '/settings', label: 'Settings', icon: Settings }
];

export default function Sidebar() {
  return (
    <aside className="glass hidden w-64 flex-col border-r border-white/10 p-4 md:flex">
      <div className="mb-6 flex items-center gap-2 px-2">
        <Disc3 className="text-brand-500" />
        <p className="font-semibold">PulseTube</p>
      </div>

      <nav className="space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
