import { createContext, useContext, useMemo, useState } from 'react';

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('off');

  const currentTrack = useMemo(() => queue[currentIndex] || null, [queue, currentIndex]);

  const playTrack = (track, sourceQueue = []) => {
    const nextQueue = sourceQueue.length ? sourceQueue : [track];
    const index = nextQueue.findIndex((t) => t.videoId === track.videoId);
    setQueue(nextQueue);
    setCurrentIndex(index === -1 ? 0 : index);
    setIsPlaying(true);
  };

  const playNext = () => {
    if (!queue.length) return;
    if (shuffle) {
      setCurrentIndex(Math.floor(Math.random() * queue.length));
      return;
    }
    if (currentIndex < queue.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else if (repeat === 'all') {
      setCurrentIndex(0);
    }
  };

  const playPrev = () => {
    if (!queue.length) return;
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const value = {
    queue,
    currentTrack,
    currentIndex,
    isPlaying,
    isFullscreen,
    shuffle,
    repeat,
    setIsPlaying,
    setIsFullscreen,
    setShuffle,
    setRepeat,
    playTrack,
    playNext,
    playPrev
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export const usePlayer = () => useContext(PlayerContext);
