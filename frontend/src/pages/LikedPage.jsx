import { useEffect, useState } from 'react';
import { getLikedSongs, toggleLikeSong } from '../api/library';
import TrackRow from '../components/TrackRow';
import { usePlayer } from '../contexts/PlayerContext';

export default function LikedPage() {
  const [songs, setSongs] = useState([]);
  const { playTrack } = usePlayer();

  const load = async () => {
    const { data } = await getLikedSongs();
    setSongs(data.items || []);
  };

  useEffect(() => {
    load();
  }, []);

  const unlike = async (track) => {
    await toggleLikeSong(track);
    load();
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Liked Songs</h1>
      <div className="space-y-1">
        {songs.map((track, i) => (
          <TrackRow key={track.videoId} track={track} index={i} onPlay={(t) => playTrack(t, songs)} onLike={unlike} liked />
        ))}
      </div>
    </div>
  );
}
