import { FC, ReactNode } from 'react';
import * as style from './IconButton.styles';
import { classes } from 'typestyle';

type ComponentProps = {
  className?: string;
  children: ReactNode | string;
  onClick: () => void;
};

const IconButton: FC<ComponentProps> = ({ className, children, onClick }) => {
  return (
    <button className={classes(style.Component, className)} onClick={onClick}>
      {children}
    </button>
  );
};

IconButton.displayName = 'Button';

export { IconButton };
