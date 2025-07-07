import { User } from './user';

export type UserContextType = {
  user: User | null;
  isUserLoading: boolean;
  refetchUser: () => void;
  logOut: () => Promise<void>;
  favorites: string[];
  refetchFavorites: () => void;
  toggleFavorite: (id: string) => Promise<void>;
};
