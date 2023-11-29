import * as style from './SegmentButton.styles';
import { useState } from 'react';

type SegmentButtonProps<T = string> = {
  buttons: T[];
  onSelect: (optionsSelected: T[]) => void;
  initialSelected: T[];
  multiSelect: boolean;
};

const SegmentButton = <T extends string>({
  buttons,
  onSelect,
  initialSelected,
  multiSelect,
}: SegmentButtonProps<T>) => {
  const [selectedOptions, setSelectedOptions] = useState<T[]>(initialSelected);

  const toggleSelected = (button: T) => {
    let newSelectedOptions: T[] = [];

    if (multiSelect) {
      if (selectedOptions.includes(button)) {
        newSelectedOptions = selectedOptions.filter((option) => option !== button);
      } else {
        newSelectedOptions = [...selectedOptions, button];
      }
    } else {
      if (selectedOptions.includes(button)) {
        return;
      } else {
        newSelectedOptions = [button];
      }
    }

    setSelectedOptions(newSelectedOptions);
    onSelect(newSelectedOptions);
  };

  return (
    <div className={style.container}>
      {buttons.map((button) => {
        const isSelected = selectedOptions.includes(button);
        return (
          <div
            key={button}
            className={isSelected ? style.buttonSelected : style.button}
            data-selected={isSelected ? 'true' : 'false'}
            onClick={() => toggleSelected(button)}
          >
            {button.toLowerCase()}
          </div>
        );
      })}
    </div>
  );
};

export { SegmentButton };
