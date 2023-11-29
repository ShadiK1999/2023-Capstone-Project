import SearchIcon from './Assets/SearchIcon.svg';

import * as styles from './AddressInput.styles';
import { Autocomplete } from '@react-google-maps/api';
import { useCallback, useContext, useRef } from 'react';
import { HomeDispatchContext } from '../../../Contexts/Home/state';
import { DEFAULT_BOUNDS } from '../../../Services/AppConstants';

const AddressInput = () => {
  const searchRef = useRef<google.maps.places.Autocomplete | null>(null);

  const dispatch = useContext(HomeDispatchContext);

  const onSearch = useCallback(() => {
    if (!searchRef.current) return;

    const place = searchRef.current.getPlace();

    const latlng = place?.geometry?.location;
    if (!latlng) return;

    dispatch({
      type: 'ADDRESS_CHANGED',
      payload: {
        lat: latlng.lat(),
        lng: latlng.lng(),
      },
    });
  }, [dispatch]);

  const onLoad = useCallback((searchBox: google.maps.places.Autocomplete) => {
    searchRef.current = searchBox;
  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.IconContainer} onClick={onSearch}>
        <img src={SearchIcon} />
      </div>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onSearch} bounds={DEFAULT_BOUNDS}>
        <input className={styles.Input} placeholder="Find address" />
      </Autocomplete>
    </div>
  );
};

export { AddressInput };
