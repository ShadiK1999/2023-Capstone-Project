import { FC, useContext } from 'react';
import { HomeContext, HomeDispatchContext, Filter } from '../../../Contexts/Home/state';
import { LabelBox } from '../LabelBox';
import { produce } from 'immer';
import { SegmentButton } from '../SegmentButton';

const TravelModeButton: FC = () => {
  const travelModes: Filter['mode'][] = ['WALKING', 'CYCLING', 'DRIVING'];
  const dispatch = useContext(HomeDispatchContext);
  const { filter } = useContext(HomeContext);

  const handleUpdateTravelMode = (options: string[]) => {
    const updatedFilter = produce(filter, (draft: typeof filter) => {
      draft.mode = options[0] as Filter['mode'];
    });

    dispatch({
      type: 'FILTER_INPUT_CHANGED',
      payload: updatedFilter,
    });
  };

  return (
    <LabelBox label="Travel Mode">
      <SegmentButton
        buttons={travelModes}
        onSelect={handleUpdateTravelMode}
        multiSelect={false}
        initialSelected={[filter.mode]}
      />
    </LabelBox>
  );
};

export { TravelModeButton };
