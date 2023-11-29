import { FC, useContext } from 'react';
import { HomeContext, HomeDispatchContext } from '../../../Contexts/Home/state';
import { PlusMinusButton } from '../PlusMinusButton';
import { produce } from 'immer';
import { LabelBox } from '../LabelBox';

const FilterTravelTime: FC = () => {
  const MINUTES_INCREMENT = 5;
  const MAX_MINUTES = 45;
  const dispatch = useContext(HomeDispatchContext);
  const { filter } = useContext(HomeContext);

  const handleUpdateTravelTime = (increment: number) => {
    if (filter.value + increment >= MAX_MINUTES || filter.value + increment <= 0) {
      return;
    }

    const updatedFilter = produce(filter, (draft: typeof filter) => {
      draft.value = filter.value + increment;
    });

    dispatch({
      type: 'FILTER_INPUT_CHANGED',
      payload: updatedFilter,
    });
  };

  return (
    <LabelBox label="Travel Time">
      <PlusMinusButton
        leftButton={{ onClick: () => handleUpdateTravelTime(-MINUTES_INCREMENT) }}
        rightButton={{ onClick: () => handleUpdateTravelTime(MINUTES_INCREMENT) }}
      >
        {filter.value + ' min'}
      </PlusMinusButton>
    </LabelBox>
  );
};

export { FilterTravelTime };
