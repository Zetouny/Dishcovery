import { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu
} from '@heroui/react';

import LoginModal from '@/components/LoginModal';
import { UserContext } from '@/context/UserContext';

export default function UserAuth() {
  const { user, setUser, logOut } = useContext(UserContext);

  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false);
  const [loginSubmitted, setLoginSubmitted] = useState<any>(null);
  const [signupSubmitted, setSignupSubmitted] = useState<any>(null);

  useEffect(() => {
    setUser(loginSubmitted);
  }, [loginSubmitted]);

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isFocusable
            as="button"
            className="transition-transform hover:bg-primary aria-[expanded=true]:bg-primary transition"
            color="default"
            name={user ? user.username[0] : ''}
            size="sm"
          />
        </DropdownTrigger>
        {user ? (
          <DropdownMenu
            aria-label="Profile Actions"
            disabledKeys={['loggedIn']}
            variant="flat"
          >
            <DropdownItem key="loggedIn" className="font-bold" color="primary">
              Logged in as {user.username}
            </DropdownItem>
            <DropdownItem key="signup" color="danger" onPress={() => logOut()}>
              Log out
            </DropdownItem>
          </DropdownMenu>
        ) : (
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="login"
              color="primary"
              onPress={() => setIsLoginOpen(true)}
            >
              Log in
            </DropdownItem>
            <DropdownItem
              key="signup"
              color="primary"
              onPress={() => setIsSignupOpen(true)}
            >
              Sign up
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>

      <LoginModal
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
        setIsSignupOpen={setIsSignupOpen}
        setLoginSubmitted={setLoginSubmitted}
      />
    </>
  );
}
