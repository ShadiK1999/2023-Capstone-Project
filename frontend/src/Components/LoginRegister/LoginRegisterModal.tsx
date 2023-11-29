import { Modal } from '..';
import { RegistrationPanel, LoginPanel } from '.';
import { FC, useMemo } from 'react';

export type View = 'LOGIN' | 'REGISTER';

type ComponentProps = {
  view: View;
  setView: (view: View) => void;
  isOpen: boolean;
  onClose: () => void;
};

export const LoginRegisterModal: FC<ComponentProps> = ({ view, setView, isOpen, onClose }) => {
  const viewProperties: Record<
    View,
    {
      page: JSX.Element;
      title: string;
      message: string;
      nextViewbuttonText: string;
      nextView: View;
    }
  > = useMemo(
    () => ({
      LOGIN: {
        page: <LoginPanel onClose={onClose} />,
        title: 'Login',
        message: 'Register for an account? ',
        nextViewbuttonText: 'Register',
        nextView: 'REGISTER',
      },
      REGISTER: {
        page: <RegistrationPanel onClose={onClose} />,
        title: 'Register',
        message: 'Already have an account? ',
        nextViewbuttonText: 'Login',
        nextView: 'LOGIN',
      },
    }),
    [onClose],
  );

  const { page, title, message, nextViewbuttonText, nextView } = viewProperties[view];

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      {page}
      <br />
      <label>
        {message}
        <a onClick={() => setView(nextView)} href="#">
          {nextViewbuttonText}
        </a>
      </label>
    </Modal>
  );
};
