import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout, LoadingFallback } from './components/layout/AppLayout';
import { ErrorBoundary } from './components/common';

const Landing = lazy(() => import('./pages/Landing'));
const Overview = lazy(() => import('./pages/Overview'));
const Budget = lazy(() => import('./pages/Budget'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Vendors = lazy(() => import('./pages/Vendors'));
const Themes = lazy(() => import('./pages/Themes'));
const Guests = lazy(() => import('./pages/Guests'));
const Assistant = lazy(() => import('./pages/Assistant'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));
const MyEvents = lazy(() => import('./pages/MyEvents'));
const CreateEvent = lazy(() => import('./pages/CreateEvent'));
const EditEvent = lazy(() => import('./pages/EditEvent'));
const EventWorkspace = lazy(() => import('./pages/EventWorkspace'));

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Overview />} />
            <Route path="events" element={<MyEvents />} />
            <Route path="events/new" element={<CreateEvent />} />
            <Route path="events/:id" element={<EventWorkspace />} />
            <Route path="events/:id/edit" element={<EditEvent />} />
            <Route path="planner" element={<CreateEvent title="AI Event Planner" />} />
            <Route path="budget" element={<Budget />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="themes" element={<Themes />} />
            <Route path="guests" element={<Guests />} />
            <Route path="assistant" element={<Assistant />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
