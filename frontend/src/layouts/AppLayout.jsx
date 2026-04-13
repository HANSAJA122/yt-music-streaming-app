import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

export default function AppLayout() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />
      <main className="w-full p-4 pb-28 md:p-6 md:pb-28">
        <TopBar query={query} setQuery={setQuery} />
        <Outlet context={{ query, setQuery }} />
      </main>
    </div>
  );
}
