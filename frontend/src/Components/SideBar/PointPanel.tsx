import { FC } from 'react';
import * as styles from './SideBar.styles';
import Walking from './Assets/Walking.svg';
import Target from './Assets/Target.svg';
import Clock from './Assets/Clock.svg';
import { DisplayPoint } from '../../Models/DeliveryPoint';
import { printTime } from '../../Services/LocationsApiClient';

export type ComponentProp = {
  point: DisplayPoint;
};

const PointPanel: FC<ComponentProp> = ({ point: { address, distanceText, timeText, hours } }) => {
  const date = new Date().getDay();
  const time = hours[date];
  return (
    <div className={styles.Panel}>
      {/* TODO: change into actual name once we get it from BE*/}
      <p className={styles.Title}>Location</p>
      <p className={styles.Address}>{address}</p>
      <div className={styles.SubtitlesPanel}>
        <SubtitleDiv
          svg={Clock}
          text={time ? `${printTime(time.openingTime)} - ${printTime(time.closingTime)}` : 'Closed'}
        />
        <SubtitleDiv svg={Walking} text={timeText} />
        <SubtitleDiv svg={Target} text={distanceText} />
      </div>
    </div>
  );
};

const SubtitleDiv: FC<{ svg: string; text: string }> = ({ svg, text }) => {
  return (
    <div className={styles.Subtitles}>
      <img src={svg} />
      <p>{text}</p>
    </div>
  );
};

export { PointPanel };
