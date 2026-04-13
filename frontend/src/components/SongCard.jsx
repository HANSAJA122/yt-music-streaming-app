import { Heart, Play } from 'lucide-react';

export default function SongCard({ item, onPlay, onLike, liked }) {
  return (
    <div className="group glass rounded-xl p-3 transition hover:bg-white/10">
      <div className="relative overflow-hidden rounded-lg">
        <img src={item.thumbnail} alt={item.title} className="h-40 w-full object-cover" />
        <button
          onClick={() => onPlay(item)}
          className="absolute bottom-3 right-3 rounded-full bg-brand-500 p-3 text-white shadow-lg transition hover:scale-110"
        >
          <Play size={18} fill="currentColor" />
        </button>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-semibold text-white">{item.title}</p>
          <p className="truncate text-sm text-zinc-400">{item.channelTitle}</p>
        </div>

        <button
          onClick={() => onLike?.(item)}
          className={`mt-1 transition ${liked ? 'text-rose-500' : 'text-zinc-400 hover:text-white'}`}
        >
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <p className="mt-1 text-xs text-zinc-500">{item.duration}</p>
    </div>
  );
}
