import { FC, useContext } from 'react';
import { HomeContext, HomeDispatchContext } from '../../../Contexts/Home/state';
import { PlusMinusButton } from '../PlusMinusButton';
import { produce } from 'immer';
import { LabelBox } from '../LabelBox';

const TravelTimeButton: FC = () => {
  const dispatch = useContext(HomeDispatchContext);
  const { filter } = useContext(HomeContext);

  const handleUpdateTravelTime = (modifier: number) => {
    if (filter.value + modifier >= 45 || filter.value + modifier <= 0) {
      return;
    }

    const updatedFilter = produce(filter, (draft: typeof filter) => {
      draft.value = filter.value + modifier;
    });

    dispatch({
      type: 'FILTER_INPUT_CHANGED',
      payload: updatedFilter,
    });
  };

  return (
    <LabelBox label="Travel Time">
      <PlusMinusButton
        leftButton={{ onClick: () => handleUpdateTravelTime(-5) }}
        rightButton={{ onClick: () => handleUpdateTravelTime(5) }}
      >
        {filter.value + ' min'}
      </PlusMinusButton>
    </LabelBox>
  );
};

export { TravelTimeButton };
