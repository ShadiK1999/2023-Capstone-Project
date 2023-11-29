import { useContext, useState } from 'react';
import { HomeContext } from '../../../Contexts/Home/state';
import { PlusMinusButton } from '../PlusMinusButton';
import { Modal } from '../../Modal';
import { FilterTravelMode, FilterTravelTime, FilterDayOfWeek, FilterTimeOfDay } from '../Filters';
import * as style from './FilterButton.styles';

export const FilterButton: React.FC = () => {
  const {
    filter: { mode, value },
  } = useContext(HomeContext);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={style.container}>
      <PlusMinusButton
        leftButton={{
          icon: 'FILTER',
          onClick: () => setShowModal(true),
        }}
        rightButton={{
          onClick: () => setShowModal(true),
        }}
      >
        <div className={style.filterButtonContent}>{mode.toLowerCase() + ' ' + value + ' min'}</div>
      </PlusMinusButton>
      <Modal title={'Filter'} isOpen={showModal} onClose={() => setShowModal(false)}>
        <FilterTravelMode />
        <FilterTravelTime />
        <FilterDayOfWeek />
        <FilterTimeOfDay />
      </Modal>
    </div>
  );
};
