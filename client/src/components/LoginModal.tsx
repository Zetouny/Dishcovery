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

type LoginModalProps = {
  isLoginOpen: boolean;
  setIsLoginOpen: Setter<boolean>;
  setIsSignupOpen: Setter<boolean>;
  setLoginSubmitted: Setter<any>;
};

type FormErrors = {
  username?: string;
  password?: string;
  error?: string;
};

export default function LoginModal({
  isLoginOpen,
  setIsLoginOpen,
  setLoginSubmitted,
  setIsSignupOpen
}: LoginModalProps) {
  const [errors, setErrors] = useState<FormErrors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const newErrors: FormErrors = {};

    if (data.password.length < 3) {
      newErrors.password = 'Password should be at least 3 characters long';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const apiData = await response.json();

      if (apiData.error) {
        throw new Error(apiData.error);
      }

      // Clear errors and submit
      setErrors({});
      setLoginSubmitted(apiData);
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
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return 'Please enter your username';
                  }

                  return errors.username;
                }}
                label="Username"
                name="username"
                placeholder="Enter your username"
                type="text"
                variant="bordered"
              />
              <Input
                isRequired
                color="primary"
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return 'Please enter your password';
                  }

                  return errors.password;
                }}
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
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
