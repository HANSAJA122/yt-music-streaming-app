import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../api/client';

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, login, signup } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Already signed in (e.g. refreshed on /auth, or just finished signup/login)
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/', { replace: true });
    }
  }, [authLoading, user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') await signup(form);
      else await login({ email: form.email, password: form.password });
      navigate('/', { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.code === 'ERR_NETWORK'
          ? `Cannot reach API at ${API_BASE_URL}. Check VITE_API_URL / CORS and that backend is running.`
          : err.message);
      setError(msg || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 text-white">
      <form onSubmit={submit} className="glass w-full max-w-md rounded-2xl p-6 shadow-glass">
        <h1 className="text-2xl font-bold">{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
        <p className="mt-1 text-sm text-zinc-400">Stream music with YouTube-powered playback.</p>

        <div className="mt-6 space-y-3">
          {mode === 'signup' && (
            <input className="w-full rounded-lg bg-white/5 p-3 outline-none" placeholder="Name" value={form.name} onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))} required />
          )}
          <input className="w-full rounded-lg bg-white/5 p-3 outline-none" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))} required />
          <input className="w-full rounded-lg bg-white/5 p-3 outline-none" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm((v) => ({ ...v, password: e.target.value }))} required />
        </div>

        {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}

        <button disabled={loading} className="mt-5 w-full rounded-lg bg-brand-500 px-4 py-3 font-medium transition hover:bg-brand-600 disabled:opacity-50">
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign up'}
        </button>

        <button type="button" className="mt-3 text-sm text-zinc-400 hover:text-white" onClick={() => setMode((m) => (m === 'login' ? 'signup' : 'login'))}>
          {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
}
