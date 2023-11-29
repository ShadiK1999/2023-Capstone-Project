import { FC, useCallback, useContext, useState } from 'react';
import { Button, ProfilePicture, LoginRegisterModal } from '../';
import { View } from '../LoginRegister/LoginRegisterModal';
import * as style from './TopBar.styles';
import { AuthDispatchContext, useGetDecodedJwt, useIsAuthenticated } from '../../Contexts/Auth';
import { useNavigate } from 'react-router-dom';

const TopBar: FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useContext(AuthDispatchContext);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    dispatch({ type: 'USER_LOGGED_OUT' });
    navigate('/');
  }, [dispatch, navigate]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<View>('LOGIN');
  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const handleOpenModal = useCallback((view: View) => {
    setIsModalOpen(true);
    setView(view);
  }, []);

  return (
    <div className={style.Component}>
      <div className={style.Left}>
        <div
          className={style.Logo}
          onClick={() => {
            navigate('/');
          }}
        >
          Trusted Neighbour
        </div>
        {isAuthenticated && <UserButton />}
      </div>
      <div className={style.Registration}>
        {!isAuthenticated ? (
          <>
            <Button onClick={() => handleOpenModal('LOGIN')}>Login</Button>
            <Button onClick={() => handleOpenModal('REGISTER')}>Register</Button>
            <LoginRegisterModal
              view={view}
              setView={setView}
              isOpen={isModalOpen}
              onClose={onCloseModal}
            />
          </>
        ) : (
          <Button onClick={logout}>Logout</Button>
        )}
      </div>
    </div>
  );
};

const UserButton = () => {
  const { name } = useGetDecodedJwt();
  const navigate = useNavigate();

  return (
    <ProfilePicture
      size="Small"
      name={name}
      onClick={() => {
        navigate('/user');
      }}
    />
  );
};

export { TopBar };
