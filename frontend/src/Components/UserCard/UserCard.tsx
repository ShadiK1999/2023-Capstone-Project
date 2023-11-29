import { ProfilePicture } from '..';
import { FC } from 'react';
import * as styles from './UserCard.styles';

type ComponentProps = {
  name: string;
  email: string | null;
  phone: string;
};

const UserCard: FC<ComponentProps> = ({ name, email, phone }) => {
  return (
    <>
      <div className={styles.CardContainer}>
        <div>
          <ProfilePicture name={name} size="Large" />
        </div>
        <div className={styles.UserInfoContainer}>
          <div className={styles.UserName}>{name}</div>
          <div className={styles.UserInfo}>{email}</div>
          <div className={styles.UserInfo}>{phone}</div>
        </div>
      </div>
    </>
  );
};

export { UserCard };
