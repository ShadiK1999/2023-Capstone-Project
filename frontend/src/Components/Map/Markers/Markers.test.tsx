// eslint-disable-next-line import/named
import { screen, render, act } from '@testing-library/react';
import { Markers } from './Markers';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HomeContext, HomeState, initialState } from '../../../Contexts/Home/state';
import { DisplayPoint } from '../../../Models/DeliveryPoint';
import { InfoWindow, Marker, mockInstances } from '@anshulsanghi/googlemaps-vitest-mocks';

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
  hours: {},
};

const mockedState: HomeState = {
  ...initialState,
  deliveryPoints: [mockedPoint1, mockedPoint2],
};

describe('Marker Elements', () => {
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
        <Markers />
      </HomeContext.Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('Displays Markers if any are present in state', () => {
    render(
      <HomeContext.Provider value={mockedState}>
        <Markers />
      </HomeContext.Provider>,
    );

    const markers = mockInstances.get(Marker);
    expect(screen.getAllByTestId('marker-div').length).toEqual(2);
    expect(markers).toHaveLength(2);
  });

  it('Displays no Markers if there are none in state', () => {
    render(
      <HomeContext.Provider value={{ ...mockedState, deliveryPoints: [] }}>
        <Markers />
      </HomeContext.Provider>,
    );

    expect(screen.queryByTestId('marker-div')).toBeFalsy();
  });

  it('Displays the info window on click', () => {
    // Arrange
    const mockCleanup = vi.fn<never, void>();
    const events: { event: string; handler: () => void }[] = [];

    vi.spyOn(google.maps.event, 'addListener').mockImplementation(
      (_instance: object, event: string, handler: unknown) => {
        events.push({ event, handler: handler as () => void });
        return { remove: mockCleanup };
      },
    );

    // Act
    render(
      <HomeContext.Provider value={mockedState}>
        <Markers />
      </HomeContext.Provider>,
    );
    const event = events[0];

    act(() => event.handler()); // actually click on the first marker

    // Assert
    const infoWindow = mockInstances.get(InfoWindow);
    expect(infoWindow).toHaveLength(1);
    expect(() => act(() => events[events.length - 1].handler())).not.toThrow(); // click on the close button. Improves code coverage :)
  });
});
