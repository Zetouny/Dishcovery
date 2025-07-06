import { useContext, useState } from 'react';
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu
} from '@heroui/react';
import { useNavigate } from 'react-router-dom';

import LoginModal from '@/components/LoginModal';
import SignupModal from '@/components/SignupModal';
import { UserContext } from '@/context/UserContext';

export default function UserAuth() {
  const { user, logOut } = useContext(UserContext);
  const navigator = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false);

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
            <DropdownItem
              key="loggedIn"
              className="font-bold"
              color="primary"
              textValue={`Logged in as ${user.username}`}
            >
              Logged in as {user.username}
            </DropdownItem>
            <DropdownItem
              key="favorite"
              onPress={() => navigator('/favorites')}
            >
              Favorites
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
      />

      <SignupModal
        isSignupOpen={isSignupOpen}
        setIsSignupOpen={setIsSignupOpen}
      />
    </>
  );
}
