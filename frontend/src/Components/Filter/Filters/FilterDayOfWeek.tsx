import { FC, useContext } from 'react';
import { HomeContext, HomeDispatchContext, DayOfWeekIndex } from '../../../Contexts/Home/state';
import { DayOfWeekButton } from '../../';
import { produce } from 'immer';

const FilterDayOfWeek: FC = () => {
  const dispatch = useContext(HomeDispatchContext);
  const { filter } = useContext(HomeContext);

  const handleUpdateDaysOfWeek = (inputDaysOfWeek: DayOfWeekIndex[]) => {
    const updatedFilter = produce(filter, (draft: typeof filter) => {
      draft.dayOfWeek = inputDaysOfWeek[0];
    });
    dispatch({
      type: 'FILTER_INPUT_CHANGED',
      payload: updatedFilter,
    });
  };

  return (
    <DayOfWeekButton
      daysOfWeek={[filter.dayOfWeek]}
      onUpdateDaysOfWeek={handleUpdateDaysOfWeek}
      multiSelect={false}
    />
  );
};

export { FilterDayOfWeek };
