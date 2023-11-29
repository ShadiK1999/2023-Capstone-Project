import { FC } from 'react';

import * as styles from './ProfilePicture.styles';

type ComponentProps = {
  name: string;
  size: 'Small' | 'Large';
  onClick?: () => void;
};

const ProfilePicture: FC<ComponentProps> = ({ size, name, onClick }) => {
  return (
    <div className={styles.Container(size)} onClick={onClick}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export { ProfilePicture };
