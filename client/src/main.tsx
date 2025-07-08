import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '@heroui/react';

import App from '@/App.tsx';
import { Provider } from '@/provider.tsx';
import '@/styles/globals.css';
import UserProvider from '@/context/UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <ToastProvider placement="top-center" toastOffset={30} />
        <UserProvider>
          <App />
        </UserProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
