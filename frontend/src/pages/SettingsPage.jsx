import { useAuth } from '../contexts/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-xl">
      <h1 className="mb-4 text-2xl font-semibold">Profile & Settings</h1>
      <div className="glass rounded-xl p-5">
        <p className="text-sm text-zinc-400">Display name</p>
        <p className="mb-3 mt-1 font-medium">{user?.name}</p>

        <p className="text-sm text-zinc-400">Email</p>
        <p className="mt-1 font-medium">{user?.email}</p>

        <p className="mt-5 text-sm text-zinc-500">
          Theme is locked to dark mode for the premium music experience.
        </p>
      </div>
    </div>
  );
}
