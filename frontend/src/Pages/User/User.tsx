import { useCallback, useContext, useEffect, useState } from 'react';
import { UserDispatchContext, UserProvider, useUserContext } from '../../Contexts/User';
import { AddressDisplay, AddressRegistrationModal, Button, Loader } from '../../Components';

import * as styles from './User.styles';
import { AddressPost, getUser, postAddress } from '../../Services/User';
import { useGetDecodedJwt, useJwt } from '../../Contexts/Auth';
import { UserCard } from '../../Components/UserCard';

const User = () => {
  return (
    <UserProvider>
      <PageInternal />
    </UserProvider>
  );
};

const PageInternal = () => {
  const { user } = useUserContext();
  const dispatch = useContext(UserDispatchContext);
  const { sub } = useGetDecodedJwt();
  const jwt = useJwt();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user === 'not-loaded') {
      getUser(sub, jwt).then(
        (value) => value.ok && dispatch({ type: 'FETCHED_USER', payload: value.value }),
      );
    }
  }, [dispatch, jwt, sub, user]);

  const onCreateAddress = useCallback(
    async (address: AddressPost) => {
      if (jwt) {
        const id = await postAddress(address, jwt);

        dispatch({
          type: 'UPDATED_ADDRESS',
          payload: {
            ...address,
            id,
          },
        });
      }
    },
    [dispatch, jwt],
  );

  if (user === 'not-loaded') return <Loader />;

  return (
    <>
      <div className={styles.Container}>
        <UserCard name={user.name} email={user.email} phone={user.phoneNumber} />
        <p className={styles.TrustedAddress}>Trusted Address</p>
        {!user.deliveryPoint ? (
          <Button onClick={() => setIsModalOpen(true)}>Add trusted address</Button>
        ) : (
          <AddressDisplay trustedPoint={user.deliveryPoint} />
        )}
      </div>
      <AddressRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEnter={onCreateAddress}
      />
    </>
  );
};

export { User };
