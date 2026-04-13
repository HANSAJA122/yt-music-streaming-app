import { useEffect, useState } from 'react';
import { getRecentlyPlayed } from '../api/library';
import TrackRow from '../components/TrackRow';
import { usePlayer } from '../contexts/PlayerContext';

export default function RecentPage() {
  const [songs, setSongs] = useState([]);
  const { playTrack } = usePlayer();

  useEffect(() => {
    const load = async () => {
      const { data } = await getRecentlyPlayed();
      setSongs(data.items || []);
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Recently Played</h1>
      <div className="space-y-1">
        {songs.map((track, i) => (
          <TrackRow key={`${track.videoId}-${i}`} track={track} index={i} onPlay={(t) => playTrack(t, songs)} liked={false} />
        ))}
      </div>
    </div>
  );
}
