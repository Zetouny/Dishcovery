import { Route, Routes } from 'react-router-dom';

import PageNotFound from './components/PageNotFound';

import HomePage from '@/pages/home';
import RecipePage from '@/pages/recipe';
import BrowsePage from '@/pages/browse';
import FavoritesPage from '@/pages/favorites';
import DefaultLayout from '@/layouts/default';

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<RecipePage />} path="/recipe/:id" />
        <Route element={<BrowsePage />} path="/browse/:type/:value" />
        <Route element={<FavoritesPage />} path="/favorites" />
        <Route element={<PageNotFound />} path="*" />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
