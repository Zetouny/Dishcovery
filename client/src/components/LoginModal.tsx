import { useContext, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@heroui/react';

import { LockIcon, MailIcon } from './icons';

import { UserContext } from '@/context/UserContext';

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

type LoginModalProps = {
  isLoginOpen: boolean;
  setIsLoginOpen: Setter<boolean>;
  setIsSignupOpen: Setter<boolean>;
};

export default function LoginModal({
  isLoginOpen,
  setIsLoginOpen,
  setIsSignupOpen
}: LoginModalProps) {
  const { refetchUser, refetchFavorites } = useContext(UserContext);

  const [errors, setErrors] = useState({ error: '' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const apiData = await response.json();

      if (apiData.error) {
        throw new Error(apiData.error);
      }

      setErrors({ error: '' });
      refetchUser();
      refetchFavorites();
      setIsLoginOpen(false);
    } catch (error) {
      setErrors({ error: `${error}` });
    }
  }

  return (
    <Modal
      backdrop="blur"
      isOpen={isLoginOpen}
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
      onOpenChange={setIsLoginOpen}
    >
      <ModalContent>
        {(onClose) => (
          <Form className="block" validationErrors={errors} onSubmit={onSubmit}>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>

            <ModalBody>
              <Input
                isRequired
                color="primary"
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Username"
                name="username"
                placeholder="Enter your username"
                type="text"
                validate={(value) => {
                  if (value.length < 3) {
                    return 'Username must be at least 3 characters long';
                  }
                }}
                variant="bordered"
              />
              <Input
                isRequired
                color="primary"
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
                validate={(value) => {
                  if (value.length < 8) {
                    return 'Password must be at least 8 characters long';
                  }
                }}
                variant="bordered"
              />
              {errors.error && (
                <div className="text-danger">{errors.error}</div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="ghost"
                onPress={() => {
                  onClose();
                  setIsSignupOpen(true);
                }}
              >
                Sign up
              </Button>
              <Button color="primary" type="submit">
                Sign in
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  );
}
