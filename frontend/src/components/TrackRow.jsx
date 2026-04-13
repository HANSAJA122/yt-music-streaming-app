import { Heart, Play } from 'lucide-react';

export default function TrackRow({ track, index, onPlay, onLike, liked }) {
  return (
    <div className="grid grid-cols-[30px_1fr_auto_auto] items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/5">
      <button onClick={() => onPlay(track)} className="text-zinc-300 hover:text-white">
        <Play size={16} />
      </button>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{index + 1}. {track.title}</p>
        <p className="truncate text-xs text-zinc-400">{track.channelTitle}</p>
      </div>
      <button onClick={() => onLike?.(track)} className={liked ? 'text-rose-500' : 'text-zinc-400'}>
        <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
      </button>
      <p className="text-xs text-zinc-400">{track.duration}</p>
    </div>
  );
}
