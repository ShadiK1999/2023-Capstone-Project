import { FC } from 'react';
import * as style from './FilterPanel.styles';
import { TravelModeButton } from './TravelModeButton';
import { TravelTimeButton } from './TravelTimeButton';
import { DayOfWeekButton } from './DayOfWeekButton';
import { TimeOfDayButton } from './TimeOfDayButton';

type FilterPanelProps = {
  onSave: () => void;
};

const FilterPanel: FC<FilterPanelProps> = ({ onSave }: FilterPanelProps) => {
  return (
    <div className={style.panel}>
      <TravelModeButton />
      <TravelTimeButton />
      <DayOfWeekButton />
      <TimeOfDayButton />
      <button onClick={() => onSave()}>Save</button>
    </div>
  );
};

export { FilterPanel };
