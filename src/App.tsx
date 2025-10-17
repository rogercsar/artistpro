import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import { FavoritesProvider } from './hooks/useFavorites';
import { Layout } from './components/layout/Layout';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Events } from './pages/Events';
import { EventDetail } from './pages/EventDetail';
import { Dancers } from './pages/Dancers';
import { Profile } from './pages/Profile';
import { CreateEvent } from './pages/CreateEvent';
import { Settings } from './pages/Settings';
import { Favorites } from './pages/Favorites';
import { EditProfile } from './pages/EditProfile';
import { NotFound } from './pages/NotFound';

// Styles
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/events" element={<Layout><Events /></Layout>} />
              <Route path="/events/:id" element={<Layout><EventDetail /></Layout>} />
              <Route path="/dancers" element={<Layout><Dancers /></Layout>} />
              <Route path="/profile/:id" element={<Layout><Profile /></Layout>} />
              <Route path="/profile/:id/edit" element={<EditProfile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/favorites" element={<Layout><Favorites /></Layout>} />
              
              {/* Protected Routes */}
              <Route path="/create-event" element={<Layout><CreateEvent /></Layout>} />
              
              {/* Fallback */}
              <Route path="/404" element={<Layout><NotFound /></Layout>} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
