import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMusic } from '../api/music';
import { getLikedSongs, toggleLikeSong } from '../api/library';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';
import { usePlayer } from '../contexts/PlayerContext';

const filters = ['song', 'artist', 'album', 'playlist'];

export default function SearchPage() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || 'Top music');
  const [filter, setFilter] = useState('song');
  const [items, setItems] = useState([]);
  const [likedIds, setLikedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { playTrack } = usePlayer();

  const runSearch = async () => {
    setError('');
    setLoading(true);
    try {
      const [res, liked] = await Promise.all([searchMusic(query, filter), getLikedSongs()]);
      setItems(res.data.items || []);
      setLikedIds(new Set((liked.data.items || []).map((s) => s.videoId)));
    } catch (e) {
      setItems([]);
      setError(e.response?.data?.message || e.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSearch();
  }, [filter]);

  const onLike = async (track) => {
    const { data } = await toggleLikeSong(track);
    setLikedIds(new Set((data.items || []).map((s) => s.videoId)));
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="rounded-lg bg-white/5 px-4 py-2 text-sm outline-none" placeholder="Search music" />
        <button onClick={runSearch} className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium hover:bg-brand-600">Search</button>

        <div className="ml-auto flex gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 text-xs capitalize ${filter === f ? 'bg-white text-black' : 'bg-white/10'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-100">
          <p className="font-medium text-rose-200">Search could not load</p>
          <p className="mt-2 text-rose-100/90">{error}</p>
          <p className="mt-3 text-xs text-rose-200/70">
            In Google Cloud: enable <strong>YouTube Data API v3</strong>, create an API key, and set <code className="rounded bg-black/30 px-1">YOUTUBE_API_KEY</code> in your
            project <code className="rounded bg-black/30 px-1">.env</code>. Restart <code className="rounded bg-black/30 px-1">npm run dev</code>.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <SongCard key={item.videoId} item={item} onPlay={(track) => playTrack(track, items)} onLike={onLike} liked={likedIds.has(item.videoId)} />
          ))}
        </div>
      )}
    </div>
  );
}
