import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylist, removeTrackFromPlaylist } from '../api/library';
import { usePlayer } from '../contexts/PlayerContext';

export default function PlaylistDetailPage() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const { playTrack } = usePlayer();

  const load = async () => {
    const { data } = await getPlaylist(id);
    setPlaylist(data.item);
  };

  useEffect(() => {
    load();
  }, [id]);

  const remove = async (videoId) => {
    await removeTrackFromPlaylist(id, videoId);
    load();
  };

  if (!playlist) return null;

  return (
    <div>
      <h1 className="text-2xl font-semibold">{playlist.title}</h1>
      <p className="text-zinc-400">{playlist.description}</p>

      <div className="mt-5 space-y-2">
        {playlist.tracks.map((track) => (
          <div key={track.videoId} className="glass flex items-center justify-between rounded-lg p-3">
            <button onClick={() => playTrack(track, playlist.tracks)} className="text-left">
              <p className="font-medium">{track.title}</p>
              <p className="text-sm text-zinc-400">{track.channelTitle}</p>
            </button>
            <button onClick={() => remove(track.videoId)} className="text-sm text-rose-400">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
