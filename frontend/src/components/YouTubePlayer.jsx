import { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { Expand, Minimize, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlayer } from '../contexts/PlayerContext';

export default function YouTubePlayer({ onTrackEnd, onTrackStart }) {
  const {
    currentTrack,
    isPlaying,
    setIsPlaying,
    playNext,
    playPrev,
    isFullscreen,
    setIsFullscreen,
    shuffle,
    setShuffle,
    repeat,
    setRepeat
  } = usePlayer();

  const playerRef = useRef(null);
  const [volume, setVolume] = useState(60);

  useEffect(() => {
    if (!playerRef.current) return;
    if (isPlaying) playerRef.current.playVideo();
    else playerRef.current.pauseVideo();
  }, [isPlaying]);

  const toggleRepeat = () => {
    setRepeat((prev) => (prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off'));
  };

  if (!currentTrack) return null;

  const containerClass = isFullscreen
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-zinc-950 to-zinc-900 p-8'
    : 'fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/10 px-4 py-3';

  return (
    <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={containerClass}>
      <div className="hidden">
        <YouTube
          videoId={currentTrack.videoId}
          opts={{ playerVars: { autoplay: 1 } }}
          onReady={(e) => {
            playerRef.current = e.target;
            e.target.setVolume(volume);
            onTrackStart?.(currentTrack);
          }}
          onEnd={() => {
            if (repeat === 'one') {
              playerRef.current?.seekTo(0);
              playerRef.current?.playVideo();
              return;
            }
            playNext();
            onTrackEnd?.();
          }}
        />
      </div>

      <div className={`w-full ${isFullscreen ? 'max-w-4xl' : 'max-w-7xl'} grid items-center gap-4 ${isFullscreen ? 'grid-cols-1' : 'grid-cols-[1fr_auto_1fr]'}`}>
        <div className="flex items-center gap-3">
          <img src={currentTrack.thumbnail} alt={currentTrack.title} className="h-14 w-14 rounded object-cover" />
          <div className="min-w-0">
            <p className="truncate font-medium">{currentTrack.title}</p>
            <p className="truncate text-xs text-zinc-400">{currentTrack.channelTitle}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button onClick={() => setShuffle(!shuffle)} className={shuffle ? 'text-brand-500' : 'text-zinc-300'}><Shuffle size={18} /></button>
          <button onClick={playPrev}><SkipBack size={18} /></button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="rounded-full bg-white p-2 text-black">
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
          </button>
          <button onClick={playNext}><SkipForward size={18} /></button>
          <button onClick={toggleRepeat} className={repeat !== 'off' ? 'text-brand-500' : 'text-zinc-300'}><Repeat size={18} /></button>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Volume2 size={16} className="text-zinc-300" />
          <input type="range" min="0" max="100" value={volume} onChange={(e) => {
            const next = Number(e.target.value);
            setVolume(next);
            playerRef.current?.setVolume(next);
          }} className="w-24" />
          <button onClick={() => setIsFullscreen((v) => !v)}>{isFullscreen ? <Minimize size={18} /> : <Expand size={18} />}</button>
        </div>
      </div>
    </motion.div>
  );
}
