import { createContext, useEffect, useState } from 'react';

type UserContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logOut: () => Promise<void>;
};

const defaultUserContext: UserContextType = {
  user: null,
  setUser: () => {},
  logOut: async () => {}
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export default function UserProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function authUser() {
      const response = await fetch('/api/users/auth', {
        credentials: 'include'
      });

      if (!response.ok) {
        setUser(null);

        return;
      }

      const data = await response.json();

      setUser(data);
    }

    authUser();
  }, []);

  async function logOut() {
    await fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include'
    });

    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, logOut }}>
      {children}
    </UserContext.Provider>
  );
}
