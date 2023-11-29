import { FC } from 'react';
import * as styles from './Loader.styles';
import { classes } from 'typestyle';

type ComponentProps = {
  className?: string;
};
const Loader: FC<ComponentProps> = ({ className }) => {
  return <div className={classes(styles.Loader, className)} />;
};

export { Loader };
