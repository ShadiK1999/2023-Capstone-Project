import { render } from '@testing-library/react';
import { IsochroneRings } from './IsochroneRings';
import { describe, it, expect } from 'vitest';
import { HomeContext, HomeState, initialState } from '../../../Contexts/Home/state';
import { Polygon, mockInstances } from '@anshulsanghi/googlemaps-vitest-mocks';

const mockedState: HomeState = {
  ...initialState,
  map: {
    ...initialState.map,
    isochroneRings: {
      inner: [
        { lat: -1, lng: -1 },
        { lat: -1, lng: 1 },
        { lat: 1, lng: 1 },
        { lat: 1, lng: -1 },
      ],
      middle: [
        { lat: -2, lng: -2 },
        { lat: -2, lng: 2 },
        { lat: 2, lng: 2 },
        { lat: 2, lng: -2 },
      ],
      outer: [
        { lat: -3, lng: -3 },
        { lat: -3, lng: 3 },
        { lat: 3, lng: 3 },
        { lat: 3, lng: -3 },
      ],
    },
  },
};

describe('Jest Snapshot testing suite', () => {
  it('Creates 3 rings when the context is not null', () => {
    const tree = render(
      <HomeContext.Provider value={mockedState}>
        <IsochroneRings />
      </HomeContext.Provider>,
    );

    const polygonMocks = mockInstances.get(Polygon);

    expect(polygonMocks).toHaveLength(3);
    expect(tree).toMatchSnapshot();
  });

  it('Creates 0 rings when the context is null', () => {
    render(
      <HomeContext.Provider value={initialState}>
        <IsochroneRings />
      </HomeContext.Provider>,
    );

    const polygonMocks = mockInstances.get(Polygon);

    expect(polygonMocks).toHaveLength(0);
  });
});
