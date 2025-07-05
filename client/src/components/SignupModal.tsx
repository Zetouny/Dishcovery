import { useState } from 'react';
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

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

type SignupModalProps = {
  isSignupOpen: boolean;
  setIsSignupOpen: Setter<boolean>;
};

export default function SignupModal({
  isSignupOpen,
  setIsSignupOpen
}: SignupModalProps) {
  const [errors, setErrors] = useState({ error: '' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const response = await fetch('/api/users', {
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
      setIsSignupOpen(false);
    } catch (error) {
      setErrors({ error: `${error}` });
    }
  }

  return (
    <Modal
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
        {() => (
          <Form className="block" validationErrors={errors} onSubmit={onSubmit}>
            <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>

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

                  return value === 'admin' ? 'Nice try!' : null;
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
              <Button color="primary" type="submit">
                Sign up
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  );
}
