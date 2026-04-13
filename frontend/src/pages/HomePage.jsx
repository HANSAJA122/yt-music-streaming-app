import { useEffect, useState } from 'react';
import { fetchRecommended, fetchTrending } from '../api/music';
import { getLikedSongs, toggleLikeSong } from '../api/library';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';
import { usePlayer } from '../contexts/PlayerContext';

export default function HomePage() {
  const [trending, setTrending] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [likedIds, setLikedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { playTrack } = usePlayer();

  useEffect(() => {
    const load = async () => {
      setError('');
      setLoading(true);
      try {
        const [t, r, liked] = await Promise.all([fetchTrending(), fetchRecommended(), getLikedSongs()]);
        setTrending(t.data.items || []);
        setRecommended(r.data.items || []);
        setLikedIds(new Set((liked.data.items || []).map((s) => s.videoId)));
      } catch (e) {
        setTrending([]);
        setRecommended([]);
        setError(e.response?.data?.message || e.message || 'Could not load music feeds');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onLike = async (track) => {
    const { data } = await toggleLikeSong(track);
    setLikedIds(new Set((data.items || []).map((s) => s.videoId)));
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-5 text-sm text-rose-100">
        <p className="font-semibold text-rose-200">Home feed unavailable</p>
        <p className="mt-2">{error}</p>
        <p className="mt-3 text-xs text-rose-200/70">
          Set a real <code className="rounded bg-black/30 px-1">YOUTUBE_API_KEY</code> in <code className="rounded bg-black/30 px-1">.env</code> (YouTube Data API v3 enabled), then restart the dev server.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-xl font-semibold">Trending</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((item) => (
            <SongCard key={item.videoId} item={item} onPlay={(track) => playTrack(track, trending)} onLike={onLike} liked={likedIds.has(item.videoId)} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Recommended For You</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((item) => (
            <SongCard key={item.videoId} item={item} onPlay={(track) => playTrack(track, recommended)} onLike={onLike} liked={likedIds.has(item.videoId)} />
          ))}
        </div>
      </section>
    </div>
  );
}
