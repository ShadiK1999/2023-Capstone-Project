import { useContext, useState } from 'react';
import * as styles from './Markers.styles';
import { InfoWindowF, MarkerF } from '@react-google-maps/api';
import { HomeContext } from '../../../Contexts/Home/state';
import { DisplayPoint, Time } from '../../../Models/DeliveryPoint';
import TrustedNeighbour from './Assets/TrustedNeighbourBlue.svg';
import PostOffice from './Assets/PostOfficeRed.svg';
import Walking from './Assets/Walking.svg';
import Target from './Assets/Target.svg';
import Clock from './Assets/Clock.svg';
import './Marker.css';

const printTime = ({ hour, minute }: Time): string => {
  const hourStr = hour < 10 ? `0${hour}` : hour;
  const minuteStr = minute < 10 ? `0${minute}` : minute;

  return `${hourStr}:${minuteStr}`;
};

const Markers = () => {
  const { deliveryPoints } = useContext(HomeContext);
  const [selectedMarker, setSelectedMarker] = useState<DisplayPoint | null>(null);

  const date = new Date().getDay();
  const time = selectedMarker?.hours[date];

  return (
    <>
      {deliveryPoints
        ? deliveryPoints.length
          ? deliveryPoints.map((pt, index) => {
              return (
                <div key={index} data-testid="marker-div">
                  <MarkerF
                    position={pt.location}
                    options={{
                      icon: pt.id ? TrustedNeighbour : PostOffice,
                    }}
                    onClick={() => {
                      setSelectedMarker(pt);
                    }}
                  />
                </div>
              );
            })
          : null
        : null}
      {selectedMarker && (
        <InfoWindowF
          position={selectedMarker.location}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div className={styles.infoContainer} data-testid="info-container">
            <div className={!selectedMarker.id ? styles.postInfoTitle : styles.neighbourInfoTitle}>
              Location
            </div>
            <div className={styles.infoDataContainer}>
              <div className={styles.infoData}>
                <p className={styles.infoAddress}>{selectedMarker.address}</p>
              </div>
              <div className={styles.infoData}>
                <img src={Clock} />
                <p>
                  Hours:{' '}
                  {time
                    ? `${printTime(time.openingTime)} - ${printTime(time.closingTime)}`
                    : 'Closed'}
                </p>
              </div>
              <div className={styles.infoData}>
                <img src={Walking} />
                <p>Travel: {selectedMarker.timeText}</p>
              </div>
              <div className={styles.infoData}>
                <img src={Target} />
                <p>Distance: {selectedMarker.distanceText}</p>
              </div>
            </div>
          </div>
        </InfoWindowF>
      )}
    </>
  );
};

export { Markers };
