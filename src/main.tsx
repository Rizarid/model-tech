import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import {PrimeReactProvider} from 'primereact/api';
import './index.css';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
 
  const { worker } = await import('./mockServer/browser.ts');
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <PrimeReactProvider value={{ unstyled: false }}>
          <App />
        </PrimeReactProvider>
      </Provider>
    </React.StrictMode>,
  )
})
