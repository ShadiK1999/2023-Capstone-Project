import { render, fireEvent } from '@testing-library/react';
import { ReactNode, useReducer } from 'react';
import { TimeOfDayButton } from './TimeOfDayButton';
import { homeReducer } from '../../../Contexts/Home/reducer';

import { describe, it, expect } from 'vitest';
import {
  HomeContext,
  Filter,
  HomeDispatchContext,
  HomeState,
  initialState,
} from '../../../Contexts/Home/state';

const mockedFilter: Filter = {
  type: 'duration',
  mode: 'WALKING',
  value: 15,
  daysOfWeek: ['SUN'],
  openTime: 8, // 8am
  closeTime: 10, // 10am
};

const mockedState: HomeState = {
  ...initialState,
  filter: mockedFilter,
};

type ComponentProps = {
  children: ReactNode;
};

function TestWrapper({ children }: ComponentProps) {
  const [state, dispatch] = useReducer(homeReducer, mockedState);

  return (
    <HomeContext.Provider value={state}>
      <HomeDispatchContext.Provider value={dispatch}>{children}</HomeDispatchContext.Provider>
    </HomeContext.Provider>
  );
}

describe('Matches DOM Snapshot', () => {
  it('Matches DOM Snapshot', () => {
    const tree = render(<TimeOfDayButton />);
    expect(tree).toMatchSnapshot();
  });

  it('open time cannot exceed close time', async () => {
    const { getAllByAltText, getAllByText } = render(
      <TestWrapper>
        <TimeOfDayButton />
      </TestWrapper>,
    );
    const plusButtons = getAllByAltText('PLUS');
    const plusOpeningHoursButton = plusButtons[0];

    const minusButtons = getAllByAltText('MINUS');
    const minusOpeningHoursButton = minusButtons[0];

    expect(getAllByText('8am')).toHaveLength(1);
    expect(getAllByText('10am')).toHaveLength(1);

    fireEvent.click(plusOpeningHoursButton);

    expect(getAllByText('9am')).toHaveLength(1);
    expect(getAllByText('10am')).toHaveLength(1);

    fireEvent.click(plusOpeningHoursButton);

    // Should remain at 9 am because 10am is the close time.
    expect(getAllByText('9am')).toHaveLength(1);
    expect(getAllByText('10am')).toHaveLength(1);

    fireEvent.click(minusOpeningHoursButton);

    expect(getAllByText('8am')).toHaveLength(1);
    expect(getAllByText('10am')).toHaveLength(1);
  });

  it('close time cannot exceed close time', async () => {
    const { getAllByAltText, getAllByText } = render(
      <TestWrapper>
        <TimeOfDayButton />
      </TestWrapper>,
    );
    const plusButtons = getAllByAltText('PLUS');
    const plusClosingHoursButton = plusButtons[1];

    const minusButtons = getAllByAltText('MINUS');
    const minusClosingHoursButton = minusButtons[1];

    expect(getAllByText('8am')).toHaveLength(1);
    expect(getAllByText('10am')).toHaveLength(1);

    fireEvent.click(minusClosingHoursButton);

    expect(getAllByText('8am')).toHaveLength(1);
    expect(getAllByText('9am')).toHaveLength(1);

    fireEvent.click(minusClosingHoursButton);

    // Should remain at 9am because 8am is the open time.
    expect(getAllByText('8am')).toHaveLength(1);
    expect(getAllByText('9am')).toHaveLength(1);

    fireEvent.click(plusClosingHoursButton);

    expect(getAllByText('8am')).toHaveLength(1);
    expect(getAllByText('10am')).toHaveLength(1);
  });
});
