import { FC, useState } from 'react';
import { DayOfWeekIndex } from '../../Contexts/Home/state';
import { LabelBox, SegmentButton } from '../';

type ComponentProps = {
  daysOfWeek: DayOfWeekIndex[];
  onUpdateDaysOfWeek: (inputDaysOfWeek: DayOfWeekIndex[]) => void;
  multiSelect: boolean;
};

type DayOfWeekDisplay = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

const DayOfWeekButton: FC<ComponentProps> = ({ daysOfWeek, onUpdateDaysOfWeek, multiSelect }) => {
  const daysOfWeekDisplay: DayOfWeekDisplay[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [selectedDays, setSelectedDays] = useState<DayOfWeekDisplay[]>(
    daysOfWeek.map((day) => daysOfWeekDisplay[day]),
  );

  const handleUpdateDaysOfWeek = (inputDaysOfWeek: DayOfWeekDisplay[]) => {
    setSelectedDays(inputDaysOfWeek);
    onUpdateDaysOfWeek(
      inputDaysOfWeek.map((day) => daysOfWeekDisplay.indexOf(day) as DayOfWeekIndex),
    );
  };

  return (
    <LabelBox label="Open on">
      <SegmentButton<DayOfWeekDisplay>
        buttons={daysOfWeekDisplay}
        onSelect={handleUpdateDaysOfWeek}
        multiSelect={multiSelect}
        initialSelected={selectedDays}
      />
    </LabelBox>
  );
};

export { DayOfWeekButton };
