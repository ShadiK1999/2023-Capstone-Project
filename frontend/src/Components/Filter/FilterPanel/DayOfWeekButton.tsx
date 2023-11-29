import { FC, useContext } from 'react';
import { HomeContext, HomeDispatchContext, DayOfWeek } from '../../../Contexts/Home/state';
import { LabelBox } from '../LabelBox';
import { SegmentButton } from '../SegmentButton';
import { produce } from 'immer';

const DayOfWeekButton: FC = () => {
  const dispatch = useContext(HomeDispatchContext);
  const { filter } = useContext(HomeContext);
  const daysOfWeekDisplay: DayOfWeek[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const handleUpdateDaysOfWeek = (inputDaysOfWeek: string[]) => {
    const updatedFilter = produce(filter, (draft: typeof filter) => {
      draft.daysOfWeek = inputDaysOfWeek as DayOfWeek[];
    });
    dispatch({
      type: 'FILTER_INPUT_CHANGED',
      payload: updatedFilter,
    });
  };

  return (
    <LabelBox label="Opening Days">
      <SegmentButton
        buttons={daysOfWeekDisplay}
        onSelect={handleUpdateDaysOfWeek}
        multiSelect={true}
        initialSelected={filter.daysOfWeek}
      />
    </LabelBox>
  );
};

export { DayOfWeekButton };
