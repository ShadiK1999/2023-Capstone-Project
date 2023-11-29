import { useContext } from 'react';
import * as styles from './SideBar.styles';
import { HomeContext } from '../../Contexts/Home/state';
import { PointPanel } from './PointPanel';
import { Loader } from '../Loader';

const SideBar = () => {
  const { deliveryPoints, isLoading } = useContext(HomeContext);

  return (
    <div className={styles.Container}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.InnerContainer} data-testid="inner-container">
          {deliveryPoints ? (
            !deliveryPoints.length ? (
              <p>No Delivery points found, please search again with a higher range</p>
            ) : (
              deliveryPoints.map((pt, index) => <PointPanel key={index} point={pt}></PointPanel>)
            )
          ) : null}
        </div>
      )}
    </div>
  );
};

export { SideBar };
