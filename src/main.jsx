import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import store from './Redux/store/store';
import { NextUIProvider } from '@nextui-org/react';
import { createRoot } from 'react-dom/client';

const root=createRoot(document.getElementById('root')) 
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);
