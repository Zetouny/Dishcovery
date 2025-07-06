import { createContext, useEffect, useState } from 'react';

import useFetch from '@/hooks/useFetch';

export type User = {
  id: string;
  username: string;
  iat: number;
  exp: number;
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logOut: () => Promise<void>;
  refetchUser: () => void;
  refetchFavorites: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => Promise<void>;
};

const defaultUserContext: UserContextType = {
  user: null,
  setUser: () => {},
  logOut: async () => {},
  refetchUser: () => {},
  refetchFavorites: () => {},
  favorites: [],
  toggleFavorite: async () => {}
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export default function UserProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const { data: userData, refetch: refetchUser } = useFetch<User | null>(
    '/api/users/auth',
    {
      credentials: 'include'
    }
  );

  const { data: favoritesData, refetch: refetchFavorites } = useFetch<string[]>(
    '/api/users/favorites',
    {
      credentials: 'include'
    }
  );

  useEffect(() => {
    if (userData) setUser(userData);
    else setUser(null);

    if (favoritesData) setFavorites(favoritesData);
    else setFavorites([]);
  }, [userData, favoritesData]);

  async function logOut() {
    await fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
    setFavorites([]);
    refetchUser();
    refetchFavorites();
  }

  async function toggleFavorite(id: string) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
    refetchFavorites();
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        refetchUser,
        refetchFavorites,
        logOut,
        favorites,
        toggleFavorite
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
