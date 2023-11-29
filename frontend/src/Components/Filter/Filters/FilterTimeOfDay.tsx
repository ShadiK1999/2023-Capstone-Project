import { FC, useCallback, useContext } from 'react';
import { TimeOfDayButton } from '../../';
import { Time } from '../../TimeOfDayButton/TimeOfDayButton';
import { HomeContext, HomeDispatchContext } from '../../../Contexts/Home/state';
import { produce } from 'immer';

const FilterTimeOfDay: FC = () => {
  const {
    filter,
    filter: { startMin, startHour, endHour, endMin },
  } = useContext(HomeContext);
  const dispatch = useContext(HomeDispatchContext);

  const handleUpdateStartTime = useCallback(
    (startTime: Time) => {
      const updatedFilter = produce(filter, (draft: typeof filter) => {
        draft.startHour = startTime.hour;
        draft.startMin = startTime.minute;
      });

      dispatch({
        type: 'FILTER_INPUT_CHANGED',
        payload: updatedFilter,
      });
    },
    [filter, dispatch],
  );

  const handleUpdateEndTime = useCallback(
    (endTime: Time) => {
      const updatedFilter = produce(filter, (draft: typeof filter) => {
        draft.endHour = endTime.hour;
        draft.endMin = endTime.minute;
      });

      dispatch({
        type: 'FILTER_INPUT_CHANGED',
        payload: updatedFilter,
      });
    },
    [filter, dispatch],
  );

  return (
    <TimeOfDayButton
      startTime={{ hour: startHour, minute: startMin }}
      endTime={{ hour: endHour, minute: endMin }}
      onUpdateStartTime={handleUpdateStartTime}
      onUpdateEndTime={handleUpdateEndTime}
    />
  );
};

export { FilterTimeOfDay };
