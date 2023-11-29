import React, { FC } from 'react';
import * as styles from './LabelBox.styles';

type ComponentProps = {
  label: string;
  children?: React.ReactNode;
};

const LabelBox: FC<ComponentProps> = ({ label, children }) => {
  return (
    <div className={styles.Container}>
      <p>{label}</p>
      <div className={styles.Body}>{children}</div>
    </div>
  );
};

export { LabelBox };
