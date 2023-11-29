import * as styles from './NotFound.styles';

const NotFound = () => {
  return (
    <div className={styles.Container}>
      <h1>Oops</h1>
      <p>Sorry, an unexpected error has occured.</p>
    </div>
  );
};

export { NotFound };
