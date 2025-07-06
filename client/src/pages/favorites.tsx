import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '@/context/UserContext';
import DefaultLayout from '@/layouts/default';

export default function FavoritesPage() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate replace to="/" />;
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className="">Favorites</h1>
        </div>
      </section>
    </DefaultLayout>
  );
}
