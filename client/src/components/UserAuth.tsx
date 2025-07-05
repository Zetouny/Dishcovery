import { useEffect, useState } from 'react';
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu
} from '@heroui/react';

import LoginModal from '@/components/LoginModal';

export default function UserAuth() {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false);
  const [loginSubmitted, setLoginSubmitted] = useState<any>(null);
  const [signupSubmitted, setSignupSubmitted] = useState<any>(null);

  useEffect(() => {
    console.log(loginSubmitted);
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
            name=""
            size="sm"
          />
        </DropdownTrigger>
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
      </Dropdown>

      <LoginModal
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
        setIsSignupOpen={setIsSignupOpen}
        setLoginSubmitted={setLoginSubmitted}
      />

      {/* <Modal
        backdrop="blur"
        isOpen={isSignupOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut'
              }
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn'
              }
            }
          }
        }}
        placement="top-center"
        onOpenChange={setIsSignupOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>
              <ModalBody>
                <Input
                  color="primary"
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Username"
                  placeholder="Choose your username"
                  variant="bordered"
                />
                <Input
                  color="primary"
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter a password"
                  type="password"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Sign up
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </>
  );
}
