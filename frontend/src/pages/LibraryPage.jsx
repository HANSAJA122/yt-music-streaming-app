import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPlaylist, getPlaylists } from '../api/library';

export default function LibraryPage() {
  const [playlists, setPlaylists] = useState([]);
  const [title, setTitle] = useState('');

  const load = async () => {
    const { data } = await getPlaylists();
    setPlaylists(data.items || []);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    if (!title.trim()) return;
    await createPlaylist({ title: title.trim(), description: 'My playlist' });
    setTitle('');
    load();
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Your Playlists</h1>

      <div className="mb-6 flex gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New playlist name" className="rounded-lg bg-white/5 px-4 py-2 outline-none" />
        <button onClick={create} className="rounded-lg bg-brand-500 px-4 py-2 hover:bg-brand-600">Create</button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {playlists.map((playlist) => (
          <Link to={`/playlist/${playlist._id}`} key={playlist._id} className="glass rounded-xl p-4 hover:bg-white/10">
            <p className="font-semibold">{playlist.title}</p>
            <p className="mt-1 text-sm text-zinc-400">{playlist.tracks.length} tracks</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
