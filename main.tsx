import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { EventsProvider } from './context/EventsProvider';
import { ToastProvider } from './components/common';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <EventsProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </EventsProvider>
    </BrowserRouter>
  </StrictMode>,
);
