import { render, fireEvent } from '@testing-library/react';
import { FilterButton } from './FilterButton';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { HomeContext, Filter, HomeState, initialState } from '../../../Contexts/Home/state';

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

describe('Matches DOM Snapshot', () => {
  beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  it('Matches DOM Snapshot', () => {
    const tree = render(<FilterButton />);
    expect(tree).toMatchSnapshot();
  });

  it('Has correct icons', () => {
    const { getByAltText } = render(<FilterButton />);
    expect(getByAltText('FILTER')).toBeInTheDocument();
    expect(getByAltText('PLUS')).toBeInTheDocument();
  });

  it('Shows filter panel when plus button clicked', () => {
    const { getByAltText, queryByText, getByText } = render(
      <HomeContext.Provider value={mockedState}>
        <FilterButton />
      </HomeContext.Provider>,
    );
    expect(queryByText('Travel Time')).not.toBeInTheDocument();

    const plusButton = getByAltText('PLUS');
    fireEvent.click(plusButton);

    // Travel time is an arbitrary string that is only present in the filter panel.
    expect(queryByText('Travel Time')).toBeInTheDocument();

    const saveButton = getByText('Close');
    fireEvent.click(saveButton);

    expect(queryByText('Travel Time')).not.toBeInTheDocument();
  });
});
