import { Route, Routes } from 'react-router-dom';

import HomePage from '@/pages/home';
import RecipePage from '@/pages/recipe';
import BrowsePage from '@/pages/browse';
import FavoritesPage from '@/pages/favorites';
import NotFound404 from '@/pages/notFound404';

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<RecipePage />} path="/recipe/:id" />
      <Route element={<BrowsePage />} path="/browse/:type/:value" />
      <Route element={<FavoritesPage />} path="/favorites" />
      <Route element={<NotFound404 />} path="*" />
    </Routes>
  );
}

export default App;
