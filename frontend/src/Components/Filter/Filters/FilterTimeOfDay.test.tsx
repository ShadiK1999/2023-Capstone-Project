import { render, fireEvent } from '@testing-library/react';
import { ReactNode, useReducer } from 'react';
import { FilterTimeOfDay } from './FilterTimeOfDay';
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
  dayOfWeek: 0,
  startHour: 8,
  startMin: 0,
  endHour: 8,
  endMin: 30,
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
    const tree = render(<FilterTimeOfDay />);
    expect(tree).toMatchSnapshot();
  });

  it('open time cannot exceed close time', () => {
    const { getAllByAltText, getAllByText } = render(
      <TestWrapper>
        <FilterTimeOfDay />
      </TestWrapper>,
    );
    const plusButtons = getAllByAltText('PLUS');
    const plusOpeningHoursButton = plusButtons[0];

    const minusButtons = getAllByAltText('MINUS');
    const minusOpeningHoursButton = minusButtons[0];

    expect(getAllByText('08:00')).toHaveLength(1);
    expect(getAllByText('08:30')).toHaveLength(1);

    fireEvent.click(plusOpeningHoursButton);

    expect(getAllByText('08:15')).toHaveLength(1);
    expect(getAllByText('08:30')).toHaveLength(1);

    fireEvent.click(plusOpeningHoursButton);

    expect(getAllByText('08:30')).toHaveLength(2);

    fireEvent.click(plusOpeningHoursButton);

    // Start time should not exceed close time.
    expect(getAllByText('08:30')).toHaveLength(2);

    fireEvent.click(minusOpeningHoursButton);

    expect(getAllByText('08:15')).toHaveLength(1);
    expect(getAllByText('08:30')).toHaveLength(1);
  });

  it('close time cannot exceed close time', () => {
    const { getAllByAltText, getAllByText } = render(
      <TestWrapper>
        <FilterTimeOfDay />
      </TestWrapper>,
    );
    const plusButtons = getAllByAltText('PLUS');
    const plusClosingHoursButton = plusButtons[1];

    const minusButtons = getAllByAltText('MINUS');
    const minusClosingHoursButton = minusButtons[1];

    expect(getAllByText('08:00')).toHaveLength(1);
    expect(getAllByText('08:30')).toHaveLength(1);

    fireEvent.click(minusClosingHoursButton);

    expect(getAllByText('08:00')).toHaveLength(1);
    expect(getAllByText('08:15')).toHaveLength(1);

    fireEvent.click(minusClosingHoursButton);

    expect(getAllByText('08:00')).toHaveLength(2);

    fireEvent.click(minusClosingHoursButton);

    // Close time should not be less than start time.

    expect(getAllByText('08:00')).toHaveLength(2);

    fireEvent.click(plusClosingHoursButton);

    expect(getAllByText('08:00')).toHaveLength(1);
    expect(getAllByText('08:15')).toHaveLength(1);
  });

  it('minutes rollover to hours', () => {
    const { getAllByAltText, getAllByText } = render(
      <TestWrapper>
        <FilterTimeOfDay />
      </TestWrapper>,
    );
    const plusButtons = getAllByAltText('PLUS');
    const plusClosingHoursButton = plusButtons[1];

    expect(getAllByText('08:00')).toHaveLength(1);
    expect(getAllByText('08:30')).toHaveLength(1);

    fireEvent.click(plusClosingHoursButton);
    fireEvent.click(plusClosingHoursButton);

    expect(getAllByText('08:00')).toHaveLength(1);
    expect(getAllByText('09:00')).toHaveLength(1);
  });
});
