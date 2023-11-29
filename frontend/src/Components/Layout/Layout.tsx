import React, { FC } from 'react';
import { TopBar } from '..';
import * as styles from './Layout.styles';

type ComponentProps = {
  children?: React.ReactNode;
};

const Layout: FC<ComponentProps> = ({ children }) => {
  return (
    <div className={styles.Container}>
      <TopBar />
      <div className={styles.Body}>{children}</div>
    </div>
  );
};

export { Layout };
