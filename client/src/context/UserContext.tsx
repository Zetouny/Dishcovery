import { createContext } from 'react';
import { addToast } from '@heroui/react';

import useFetch from '@/hooks/useFetch';
import { User } from '@/types/user';
import { UserContextType } from '@/types/userContext';

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

  const {
    data: favorites,
    setData: setFavorites,
    refetch: refetchFavorites
  } = useFetch<string[]>('/api/favorites', { credentials: 'include' });

  async function logOut() {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error("We couldn't log out, please try again!");
      }

      await refetchUser();
      await refetchFavorites();
    } catch (error: any) {
      addToast({
        title: 'Error',
        description: error.message,
        color: 'danger',
        timeout: 10000
      });
    }
  }

  async function toggleFavorite(id: string) {
    if (favorites.includes(id)) {
      const newFavorites = favorites.filter((item: string) => item !== id);

      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, id]);
    }

    try {
      await fetch('/api/favorites', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteId: id })
      });
    } catch (error: any) {
      addToast({
        title: 'Error',
        description: error.message,
        color: 'danger',
        timeout: 10000
      });
    } finally {
      await refetchFavorites();
    }
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
