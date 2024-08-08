import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import Preloader from './components/PreLoader/index.jsx';

// TODO: Temporarily removed StrictMode, since it affects sideeffects that call api twice.
//  and I need to limit those calls since the api is limited. 
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Preloader isLoading={true} />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);
