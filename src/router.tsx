import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { HomePage } from './pages/HomePage'
import { EventsPage } from './pages/EventsPage'
import { EventDetailPage } from './pages/EventDetailPage'
import { CreateEventPage } from './pages/CreateEventPage'
import { PlansPage } from './pages/PlansPage'
import { ProfilePage } from './pages/ProfilePage'
import { EditProfilePage } from './pages/EditProfilePage'
import { MessagesPage } from './pages/MessagesPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { AdminPage } from './pages/AdminPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { NotFoundPage } from './pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/events', element: <EventsPage /> },
      { path: '/events/new', element: <CreateEventPage /> },
      { path: '/events/:id', element: <EventDetailPage /> },
      { path: '/plans', element: <PlansPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/profile/edit', element: <EditProfilePage /> },
      { path: '/profile/:type/:id', element: <ProfilePage /> },
      { path: '/messages', element: <MessagesPage /> },
      { path: '/messages/:threadId', element: <MessagesPage /> },
      { path: '/notifications', element: <NotificationsPage /> },
      { path: '/admin', element: <AdminPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

