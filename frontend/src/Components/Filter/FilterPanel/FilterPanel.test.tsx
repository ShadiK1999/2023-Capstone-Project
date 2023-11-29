// eslint-disable-next-line import/named
import { screen, render } from '@testing-library/react';
import { FilterPanel } from './FilterPanel';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { HomeContext, Filter, HomeState, initialState } from '../../../Contexts/Home/state';

const mockedFilter: Filter = {
  type: 'duration',
  mode: 'WALKING',
  value: 15,
  daysOfWeek: ['SUN'],
  openTime: 0,
  closeTime: 23,
};

const mockedState: HomeState = {
  ...initialState,
  filter: mockedFilter,
};

describe('Filter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 8, 4));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Matches DOM Snapshot', () => {
    const tree = render(
      <HomeContext.Provider value={mockedState}>
        <FilterPanel onSave={() => void 0} />
      </HomeContext.Provider>,
    );

    expect(tree).toMatchSnapshot();
  });

  it('Renders the correct isochrone input', () => {
    render(
      <HomeContext.Provider value={mockedState}>
        <FilterPanel onSave={() => void 0} />
      </HomeContext.Provider>,
    );

    const sundayButton = screen.getByText('sun');
    const saturdayButton = screen.getByText('sat');

    const walkingModeButton = screen.getByText('walking');
    const bicyclingModeButton = screen.getByText('cycling');

    expect(sundayButton.getAttribute('data-selected')).toBe('true');
    expect(saturdayButton.getAttribute('data-selected')).toBe('false');

    expect(walkingModeButton.getAttribute('data-selected')).toBe('true');
    expect(bicyclingModeButton.getAttribute('data-selected')).toBe('false');

    // travel time
    expect(screen.getByText('15 min')).toBeInTheDocument();
    // open hour
    expect(screen.getByText('12am')).toBeInTheDocument();
    // close hour
    expect(screen.getByText('11pm')).toBeInTheDocument();
  });
});
