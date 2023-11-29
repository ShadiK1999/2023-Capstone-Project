import { FC, useContext } from 'react';
import * as style from './TimeOfDayButton.styles';
import { HomeContext, HomeDispatchContext } from '../../../Contexts/Home/state';
import { LabelBox } from '../LabelBox';
import { PlusMinusButton } from '../PlusMinusButton';
import { produce } from 'immer';

const TimeOfDayButton: FC = () => {
  const dispatch = useContext(HomeDispatchContext);
  const { filter } = useContext(HomeContext);
  const hoursDisplay: string[] = [
    '12am',
    '1am',
    '2am',
    '3am',
    '4am',
    '5am',
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12pm',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm',
    '8pm',
    '9pm',
    '10pm',
    '11pm',
  ];
  const MIN_HOUR = 0;
  const MAX_HOUR = 23;

  const handleUpdateOpenHours = (inputOpenTime: number) => {
    if (inputOpenTime >= filter.closeTime || inputOpenTime < MIN_HOUR) {
      return;
    }

    const updatedFilter = produce(filter, (draft: typeof filter) => {
      draft.openTime = inputOpenTime;
    });

    dispatch({
      type: 'FILTER_INPUT_CHANGED',
      payload: updatedFilter,
    });
  };

  const handleUpdateCloseHours = (inputCloseTime: number) => {
    if (inputCloseTime <= filter.openTime || inputCloseTime > MAX_HOUR) {
      return;
    }

    const updatedFilter = produce(filter, (draft: typeof filter) => {
      draft.closeTime = inputCloseTime;
    });

    dispatch({
      type: 'FILTER_INPUT_CHANGED',
      payload: updatedFilter,
    });
  };

  return (
    <div className={style.container}>
      <LabelBox label="Open from...">
        <PlusMinusButton
          leftButton={{
            onClick: () => handleUpdateOpenHours(filter.openTime - 1),
          }}
          rightButton={{
            onClick: () => handleUpdateOpenHours(filter.openTime + 1),
          }}
        >
          {hoursDisplay[filter.openTime]}
        </PlusMinusButton>
      </LabelBox>
      <LabelBox label="Until...">
        <PlusMinusButton
          leftButton={{
            onClick: () => handleUpdateCloseHours(filter.closeTime - 1),
          }}
          rightButton={{
            onClick: () => handleUpdateCloseHours(filter.closeTime + 1),
          }}
        >
          {hoursDisplay[filter.closeTime]}
        </PlusMinusButton>
      </LabelBox>
    </div>
  );
};

export { TimeOfDayButton };
