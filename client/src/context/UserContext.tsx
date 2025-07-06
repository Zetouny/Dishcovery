import { createContext } from 'react';

import useFetch from '@/hooks/useFetch';
import { User } from '@/types/user';

export type UserContextType = {
  user: User | null;
  isUserLoading: boolean;
  refetchUser: () => void;
  logOut: () => Promise<void>;
  favorites: string[];
  refetchFavorites: () => void;
  toggleFavorite: (id: string) => Promise<void>;
};

const defaultUserContext: UserContextType = {
  user: null,
  isUserLoading: true,
  refetchUser: () => {},
  logOut: async () => {},
  favorites: [],
  refetchFavorites: () => {},
  toggleFavorite: async () => {}
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export default function UserProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const {
    data: user,
    loading: isUserLoading,
    refetch: refetchUser
  } = useFetch<User>('/api/users/auth', { credentials: 'include' });

  const { data: favorites, refetch: refetchFavorites } = useFetch<string[]>(
    '/api/favorites',
    { credentials: 'include' }
  );

  async function logOut() {
    await fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include'
    });
    await refetchUser();
    await refetchFavorites();
  }

  async function toggleFavorite(id: string) {
    await fetch('/api/favorites', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favoriteId: id })
    });
    await refetchFavorites();
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isUserLoading,
        refetchUser,
        logOut,
        favorites,
        refetchFavorites,
        toggleFavorite
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
