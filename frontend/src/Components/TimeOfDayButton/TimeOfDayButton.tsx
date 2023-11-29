import { FC, useCallback } from 'react';
import { LabelBox, PlusMinusButton } from '../';

const MINUTES_INCREMENT = 15;

export type Time = {
  hour: number;
  minute: number;
};

type ComponentProps = {
  startTime: Time;
  endTime: Time;
  onUpdateStartTime: (time: Time) => void;
  onUpdateEndTime: (time: Time) => void;
};

const TimeOfDayButton: FC<ComponentProps> = ({
  startTime,
  endTime,
  onUpdateStartTime,
  onUpdateEndTime,
}) => {
  const handleUpdateStartTime = useCallback(
    (increment: number) => {
      let newStartMinute = startTime.minute + increment;
      let newStartHour = startTime.hour;

      if (newStartMinute > 59) {
        newStartHour = startTime.hour + 1;
        newStartMinute = 0;
      }

      if (newStartMinute < 0) {
        newStartHour = startTime.hour - 1;
        newStartMinute = 60 - MINUTES_INCREMENT;
      }

      if (
        newStartHour > endTime.hour ||
        (newStartHour === endTime.hour && newStartMinute > endTime.minute)
      ) {
        return;
      }

      if (newStartHour < 0) {
        return;
      }

      onUpdateStartTime({ hour: newStartHour, minute: newStartMinute });
    },
    [onUpdateStartTime, startTime, endTime],
  );

  const handleUpdateEndTime = useCallback(
    (increment: number) => {
      let newEndMinute = endTime.minute + increment;
      let newEndHour = endTime.hour;

      if (newEndMinute > 59) {
        newEndHour = endTime.hour + 1;
        newEndMinute = 0;
      }

      if (newEndMinute < 0) {
        newEndHour = endTime.hour - 1;
        newEndMinute = 60 - MINUTES_INCREMENT;
      }

      if (
        newEndHour < startTime.hour ||
        (newEndHour === startTime.hour && newEndMinute < startTime.minute)
      ) {
        return;
      }

      if (newEndHour > 23) {
        return;
      }

      onUpdateEndTime({ hour: newEndHour, minute: newEndMinute });
    },
    [onUpdateEndTime, startTime, endTime],
  );

  return (
    <>
      <LabelBox label="Open from">
        <PlusMinusButton
          leftButton={{
            onClick: () => handleUpdateStartTime(-MINUTES_INCREMENT),
          }}
          rightButton={{
            onClick: () => handleUpdateStartTime(MINUTES_INCREMENT),
          }}
        >
          {startTime.hour < 10 ? '0' + startTime.hour : startTime.hour}:
          {startTime.minute < 10 ? '0' + startTime.minute : startTime.minute}
        </PlusMinusButton>
      </LabelBox>
      <LabelBox label="Open until">
        <PlusMinusButton
          leftButton={{
            onClick: () => handleUpdateEndTime(-MINUTES_INCREMENT),
          }}
          rightButton={{
            onClick: () => handleUpdateEndTime(MINUTES_INCREMENT),
          }}
        >
          {endTime.hour < 10 ? '0' + endTime.hour : endTime.hour}:
          {endTime.minute < 10 ? '0' + endTime.minute : endTime.minute}
        </PlusMinusButton>
      </LabelBox>
    </>
  );
};

export { TimeOfDayButton };
