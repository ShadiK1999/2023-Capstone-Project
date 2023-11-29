import * as styles from './AddressRegistration.styles';
import { FC, useCallback, useState, useRef, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Autocomplete } from '@react-google-maps/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DEFAULT_BOUNDS } from '../../Services/AppConstants';
import { DayOfWeekButton, TimeOfDayButton, LabelBox } from '../';
import { DayOfWeekIndex } from '../../Contexts/Home/state';
import { AddressPost } from '../../Services/User';
import { OpeningHours, TrustedPoint } from '../../Models/DeliveryPoint';

export const errorMessages = {
  address: 'Address is required.',
  daysOfWeek: 'Please select at least one day.',
};

const { address, daysOfWeek } = errorMessages;

const validationSchema = z.object({
  address: z.string().nonempty({ message: address }),
  daysOfWeek: z.array(z.number()).min(1, { message: daysOfWeek }),
});

type ValidationSchema = z.infer<typeof validationSchema>;
const resolver = zodResolver(validationSchema);

type ComponentProps = {
  initialAddress?: TrustedPoint;
  onClose: () => void;
  onEnter: (_: AddressPost) => Promise<void>;
};

const AddressRegistrationPanel: FC<ComponentProps> = ({ onClose, onEnter, initialAddress }) => {
  const searchRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [latlng, setLatlng] = useState<google.maps.LatLngLiteral | null>(
    initialAddress?.location ?? null,
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [daysOfWeek, setDaysOfWeek] = useState<DayOfWeekIndex[]>(
    Object.keys(initialAddress?.hours ?? {}).map((hour) => +hour as DayOfWeekIndex),
  );
  const [startTime, setStartTime] = useState<{ hour: number; minute: number }>({
    hour: 9,
    minute: 0,
  });
  const [endTime, setEndTime] = useState<{ hour: number; minute: number }>({
    hour: 17,
    minute: 0,
  });

  useEffect(() => {
    setValue('daysOfWeek', daysOfWeek);
  }, [setValue, daysOfWeek]);

  const onSubmit: SubmitHandler<ValidationSchema> = useCallback(
    async (data) => {
      if (latlng) {
        const hours: OpeningHours = {};
        daysOfWeek.forEach((day) => {
          hours[day] = {
            openingTime: startTime,
            closingTime: endTime,
          };
        });
        const body: AddressPost = {
          address: data.address,
          location: latlng,
          hours: hours,
        };

        await onEnter(body);
        onClose();
      } else {
        setSubmitError('Please check your address again');
      }
    },
    [latlng, daysOfWeek, onEnter, onClose, startTime, endTime],
  );

  const onLoad = useCallback((searchBox: google.maps.places.Autocomplete) => {
    searchRef.current = searchBox;
  }, []);

  const onSearch = useCallback(() => {
    if (!searchRef.current) return;
    const place = searchRef.current.getPlace();
    const latlng = place?.geometry?.location;
    if (!latlng) return;
    setLatlng({
      lat: latlng.lat(),
      lng: latlng.lng(),
    });
  }, []);

  return (
    <div className={styles.Component}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.InputContainer}>
          <LabelBox label="Address">
            <Autocomplete onLoad={onLoad} onPlaceChanged={onSearch} bounds={DEFAULT_BOUNDS}>
              <input
                type="text"
                data-testid="address"
                {...register('address')}
                value={initialAddress?.address}
                readOnly={!!initialAddress}
              />
            </Autocomplete>
          </LabelBox>
          {errors?.address && <span>{errors.address.message}</span>}
        </div>
        <div className={styles.InputContainer}>
          <DayOfWeekButton
            daysOfWeek={daysOfWeek}
            onUpdateDaysOfWeek={setDaysOfWeek}
            multiSelect={true}
          />
          {errors?.daysOfWeek && <span>{errors.daysOfWeek.message}</span>}
        </div>
        <TimeOfDayButton
          startTime={startTime}
          endTime={endTime}
          onUpdateStartTime={setStartTime}
          onUpdateEndTime={setEndTime}
        />
        <p>
          For address verification, our team will contact you within 48 hours to confirm your
          residency.
        </p>
        <div className={styles.InputContainer}>
          <button type="submit">Submit</button>
          {submitError && <span>{submitError}</span>}
        </div>
      </form>
    </div>
  );
};

export { AddressRegistrationPanel };
