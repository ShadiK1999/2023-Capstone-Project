import { useCallback, useContext } from 'react';
import { Button, FilterButton } from '..';
import { AddressInput } from './AddressInput';
import * as styles from './InputBar.styles';
import { HomeContext, HomeDispatchContext } from '../../Contexts/Home/state';
import { SearchPoints } from '../../Services/LocationsApiClient';
import { DisplayPoint } from '../../Models/DeliveryPoint';
import { computeIsochroneRings } from '../../Services/Isochrone';
import { getDistance, getApproximateMaximumDistance } from '../../Services/Distance';

const InputBar = () => {
  const {
    map: { currentLocation },
    filter,
  } = useContext(HomeContext);

  const dispatch = useContext(HomeDispatchContext);

  const onSearch = useCallback(async () => {
    dispatch({
      type: 'START_LOADING',
    });

    const ringsSizes = {
      inner: Math.round((filter.value / 3) * 1),
      middle: Math.round((filter.value / 3) * 2),
      outer: filter.value,
    };

    const isochroneOutput = await computeIsochroneRings({
      base: {
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        type: filter.type,
        mode: filter.mode,
      },
      value: ringsSizes,
    });

    const approximateMaxDistance = Math.ceil(
      getApproximateMaximumDistance(filter.value, filter.mode),
    );

    const { points } = await SearchPoints(
      currentLocation.lat,
      currentLocation.lng,
      approximateMaxDistance,
      filter.startHour,
      filter.startMin,
      filter.endHour,
      filter.endMin,
      filter.dayOfWeek,
    );

    const data = points.length
      ? await getDistance(
          currentLocation,
          points.map((pt) => pt.location),
          filter.mode,
        )
      : [];
    ``;

    const calcDeliveryPoints = data.map<DisplayPoint>((d, i) => {
      return {
        ...points[i],
        distanceText: d.distanceText,
        timeText: d.durationText,
      };
    });

    dispatch({
      type: 'ISOCHRONE_READY',
      payload: isochroneOutput,
    });
    dispatch({
      type: 'FETCH_DELIVERY_POINTS_SUCCESS',
      payload: calcDeliveryPoints,
    });
    dispatch({
      type: 'LOAD_SUCCESSFUL',
    });
  }, [currentLocation, filter, dispatch]);

  return (
    <div className={styles.Container}>
      <AddressInput />
      <FilterButton />
      <Button onClick={onSearch}>Search</Button>
    </div>
  );
};

export { InputBar };
