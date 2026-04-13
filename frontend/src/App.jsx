import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import AppLayout from './layouts/AppLayout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';
import LikedPage from './pages/LikedPage';
import RecentPage from './pages/RecentPage';
import SettingsPage from './pages/SettingsPage';
import PlaylistDetailPage from './pages/PlaylistDetailPage';
import RequireAuth from './components/RequireAuth';
import YouTubePlayer from './components/YouTubePlayer';
import { usePlayer } from './contexts/PlayerContext';
import { addRecentlyPlayed } from './api/library';

export default function App() {
  const { currentTrack } = usePlayer();

  useEffect(() => {
    if (!currentTrack) return;
    addRecentlyPlayed(currentTrack).catch(() => null);
  }, [currentTrack]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="liked" element={<LikedPage />} />
          <Route path="recent" element={<RecentPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <YouTubePlayer />
    </BrowserRouter>
  );
}
