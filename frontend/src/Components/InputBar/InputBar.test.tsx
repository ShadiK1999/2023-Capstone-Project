// eslint-disable-next-line import/named
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputBar } from './InputBar';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { IsochroneInput, IsochroneRingsOutput } from '../../Services/Isochrone';
import { DeliveryPoint } from '../../Models/DeliveryPoint';
import { HomeDispatchContext } from '../../Contexts/Home/state';

describe('Input Bar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Matches DOM Snapshot', () => {
    const tree = render(<InputBar />);
    expect(tree).toMatchSnapshot();
  });

  it('dispatches successfully on button click', async () => {
    // Arrange
    const mockDispatch = vi.fn();
    render(
      <HomeDispatchContext.Provider value={mockDispatch}>
        <InputBar />
      </HomeDispatchContext.Provider>,
    );

    vi.mock('../../Services/LocationsApiClient', () => ({
      SearchPoints: vi.fn(
        (_lat: number, _lng: number, _distance: number): Promise<{ points: DeliveryPoint[] }> =>
          Promise.resolve({
            points: [
              {
                id: undefined,
                address: '1 elizabeth st',
                location: {
                  lat: 0,
                  lng: 0,
                },
                hours: {
                  1: {
                    openingTime: { hour: 9, minute: 0 },
                    closingTime: { hour: 17, minute: 0 },
                  },
                },
              },
            ],
          }),
      ),
    }));

    vi.mock('../../Services/Isochrone', () => ({
      computeIsochroneRings: vi.fn(
        (_base, _input: IsochroneInput): Promise<IsochroneRingsOutput> =>
          Promise.resolve({
            inner: [
              { lat: -1, lng: -1 },
              { lat: -1, lng: 1 },
              { lat: 1, lng: 1 },
              { lat: 1, lng: -1 },
            ],
            middle: [
              { lat: -1, lng: -1 },
              { lat: -1, lng: 1 },
              { lat: 1, lng: 1 },
              { lat: 1, lng: -1 },
            ],
            outer: [
              { lat: -1, lng: -1 },
              { lat: -1, lng: 1 },
              { lat: 1, lng: 1 },
              { lat: 1, lng: -1 },
            ],
          }),
      ),
    }));

    vi.mock('../../Services/Distance', () => ({
      getApproximateMaximumDistance: vi.fn((_travelTime, _travelMode) => Promise.resolve(1)),
      getDistance: vi.fn((_origin, _destination, _travelMode) =>
        Promise.resolve([
          {
            distanceText: '1km',
            distanceValue: 1,
            durationText: '15 minutes',
            durationValue: 15,
          },
        ]),
      ),
    }));

    // Act
    await userEvent.click(screen.getByText('Search'));

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ISOCHRONE_READY',
      payload: {
        inner: [
          { lat: -1, lng: -1 },
          { lat: -1, lng: 1 },
          { lat: 1, lng: 1 },
          { lat: 1, lng: -1 },
        ],
        middle: [
          { lat: -1, lng: -1 },
          { lat: -1, lng: 1 },
          { lat: 1, lng: 1 },
          { lat: 1, lng: -1 },
        ],
        outer: [
          { lat: -1, lng: -1 },
          { lat: -1, lng: 1 },
          { lat: 1, lng: 1 },
          { lat: 1, lng: -1 },
        ],
      },
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'LOAD_SUCCESSFUL',
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'FETCH_DELIVERY_POINTS_SUCCESS',
      payload: [
        {
          address: '1 elizabeth st',
          location: {
            lat: 0,
            lng: 0,
          },
          hours: {
            1: {
              openingTime: { hour: 9, minute: 0 },
              closingTime: { hour: 17, minute: 0 },
            },
          },
          distanceText: '1km',
          timeText: '15 minutes',
        },
      ],
    });
  });
});
