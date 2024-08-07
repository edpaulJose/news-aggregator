import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { CATEGORIES } from './utils/navigationItems';

import Layout from './components/Layout';
import Preloader from './components/PreLoader';

const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Suspense fallback={<Preloader isLoading={true} />}>
              <Home />
            </Suspense>
          </Layout>
        }
      />
      {CATEGORIES.map(category => {
        const Component = category.component;
        return (
          <Route
            key={category.code}
            path={category.link}
            element={
              <Layout>
                <Suspense fallback={<Preloader isLoading={true} />}>
                  <Component />
                </Suspense>
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
