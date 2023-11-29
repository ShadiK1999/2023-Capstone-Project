// eslint-disable-next-line import/named
import { screen, render } from '@testing-library/react';
import { SideBar } from './SideBar';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { HomeContext, HomeState, initialState } from '../../Contexts/Home/state';
import { DisplayPoint } from '../../Models/DeliveryPoint';
import { PointPanel } from './PointPanel';

const mockedPoint1: DisplayPoint = {
  id: undefined,
  address: '1 elizabeth st',
  distanceText: '1 km',
  timeText: '15 minutes',
  location: {
    lat: 0,
    lng: 0,
  },
  hours: {
    1: {
      openingTime: { hour: 9, minute: 0 },
      closingTime: { hour: 17, minute: 0 },
    }, // Open on Monday from 9 o'clock to 17 o'clock
  },
};

const mockedPoint2: DisplayPoint = {
  id: undefined,
  address: '2 collins st',
  distanceText: '2 km',
  timeText: '30 minutes',
  location: {
    lat: 0,
    lng: 0,
  },
  hours: {}, // Closed on Monday
};

const mockedState: HomeState = {
  ...initialState,
  deliveryPoints: [mockedPoint1, mockedPoint2],
};

describe('Sidebar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 8, 4)); // Monday. Months in Node JS is 0 based from 0 - 11 so this date means 4/9/2023. Trippy, I know
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Matches DOM Snapshot', () => {
    // Arrange
    const tree = render(
      <HomeContext.Provider value={mockedState}>
        <SideBar />
      </HomeContext.Provider>,
    );

    // Assert
    expect(tree).toMatchSnapshot();
  });

  it('Displays 2 points given 2 points in state', () => {
    // Arrange
    render(
      <HomeContext.Provider value={mockedState}>
        <SideBar />
      </HomeContext.Provider>,
    );

    // Assert
    expect(screen.getByTestId('inner-container').childNodes.length).toEqual(2);
    expect(screen.getAllByText('1 elizabeth st')).toHaveLength(1);
    expect(screen.getAllByText('2 collins st')).toHaveLength(1);
  });

  it('Displays not found given empty array in state', () => {
    // Arrange
    render(
      <HomeContext.Provider value={{ ...mockedState, deliveryPoints: [] }}>
        <SideBar />
      </HomeContext.Provider>,
    );

    // Assert
    expect(
      screen.getAllByText('No Delivery points found, please search again with a higher range'),
    ).toHaveLength(1);
  });

  it('Displays loading if status is loading in state', () => {
    // Arrange
    render(
      <HomeContext.Provider value={{ ...mockedState, deliveryPoints: [], isLoading: true }}>
        <SideBar />
      </HomeContext.Provider>,
    );

    // Assert
    expect(screen.queryByTestId('inner-container')).toBeNull();
  });
});

describe('Point panel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 8, 4)); // Monday. Months in Node JS is 0 based from 0 - 11 so this date means 4/9/2023. Trippy, I know
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Matches DOM Snapshot', () => {
    // Arrange
    const tree = render(<PointPanel point={mockedPoint1} />);

    // Assert
    expect(tree).toMatchSnapshot();
  });

  it('Displays opening hours if open', () => {
    // Arrange
    render(<PointPanel point={mockedPoint1} />);

    // Assert
    expect(screen.queryAllByText('09:00 - 17:00')).toHaveLength(1);
  });

  it('Displays closed if not open', () => {
    // Arrange
    render(<PointPanel point={mockedPoint2} />);

    // Assert
    expect(screen.queryAllByText('Closed')).toHaveLength(1);
  });
});
