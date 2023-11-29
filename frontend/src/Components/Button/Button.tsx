import { FC, ReactNode } from 'react';
import * as style from './Button.styles';
import { classes } from 'typestyle';

type ComponentProps = {
  className?: string;
  children: ReactNode | string;
  onClick: () => void;
};

const Button: FC<ComponentProps> = ({ className, children, onClick }) => {
  return (
    <button className={classes(style.Component, className)} onClick={onClick}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export { Button };
