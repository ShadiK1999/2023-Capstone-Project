/* istanbul ignore file */
import createClient from 'openapi-fetch';
import { paths } from '../Models/v1/TrustedNeighbourAPI';
import { DeliveryPoint, OpeningHours, Time } from '../Models/DeliveryPoint';
import { DayOfWeekIndex } from '../Contexts/Home/state';

const { POST } = createClient<paths>({ baseUrl: '/api' });

const SearchPoints = async (
  latitude: number,
  longitude: number,
  distance: number,
  startHour: number,
  startMin: number,
  endHour: number,
  endMin: number,
  dayOfWeek: DayOfWeekIndex,
): Promise<{ points: DeliveryPoint[] }> => {
  const response = await POST('/points/search', {
    body: {
      filters: [
        {
          filterType: 'location',
          coords: {
            latitude: latitude,
            longitude: longitude,
          },
          rangeKm: distance,
        },
        {
          filterType: 'hours',
          startHour: startHour,
          startMin: startMin,
          endHour: endHour,
          endMin: endMin,
        },
        {
          filterType: 'day',
          dayOfWeek: dayOfWeek,
        },
      ],
    },
  });

  if (!response.data || !response.data.points) {
    throw new Error('API error');
  }
  const deliveryPoints = response.data.points.map<DeliveryPoint>((point) => {
    const location = {
      lat: point.location?.latitude ?? 0,
      lng: point.location?.longitude ?? 0,
    };
    const hours: OpeningHours = {};

    point.hours?.forEach(({ day, startHour, startMinute, endHour, endMinute }) => {
      if (day == undefined) return;
      const openTime = {
        hour: startHour ?? 0,
        minute: startMinute ?? 0,
      };
      const closeTime = {
        hour: endHour ?? 23,
        minute: endMinute ?? 0,
      };
      hours[day] = {
        openingTime: openTime,
        closingTime: closeTime,
      };
    });

    return {
      location: location,
      hours: hours,
      address: point.address ?? '',
      id: point.id ?? undefined,
    };
  });

  return {
    points: deliveryPoints,
  };
};
const printTime = ({ hour, minute }: Time): string => {
  const hourStr = hour < 10 ? `0${hour}` : hour;
  const minuteStr = minute < 10 ? `0${minute}` : minute;

  return `${hourStr}:${minuteStr}`;
};

export { SearchPoints, printTime };
