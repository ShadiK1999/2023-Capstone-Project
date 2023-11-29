import { Map, InputBar, SideBar } from '../../Components';
import { HomeProvider } from '../../Contexts';

import * as styles from './Home.styles';

const Home = () => {
  return (
    <HomeProvider>
      <PageInternal />
    </HomeProvider>
  );
};

const PageInternal = () => {
  return (
    <div className={styles.Container}>
      <InputBar />
      <div></div>
      <Map />
      <SideBar />
    </div>
  );
};

export { Home };
