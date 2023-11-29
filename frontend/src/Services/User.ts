import { OpeningHours, TrustedPoint } from '../Models/DeliveryPoint';
import { TrustedNeighbour } from '../Models/TrustedNeighbour';
import { Result } from './CommonTypes';

type TrustedNeighbourResponse = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  deliveryPoint: DeliveryPointResponse | null;
};
type DeliveryPointResponse = {
  location: { latitude: number; longitude: number };
  address: string;
  hours: Array<{
    day: number;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
  }>;
  id: string;
};

export const getUser = async (
  id: string,
  jwt?: string | null,
): Promise<Result<TrustedNeighbour>> => {
  const header = jwt
    ? {
        Authorization: `Bearer ${jwt}`,
      }
    : undefined;
  const fetchResult = await fetch(`api/users/${id}`, {
    method: 'GET',
    headers: header,
  });

  if (fetchResult.ok) {
    const user = (await fetchResult.json()) as TrustedNeighbourResponse;
    const hours: OpeningHours = {};
    if (user.deliveryPoint) {
      user.deliveryPoint.hours.forEach((hour) => {
        hours[hour.day] = {
          openingTime: {
            hour: hour.startHour,
            minute: hour.startMinute,
          },
          closingTime: {
            hour: hour.endHour,
            minute: hour.endMinute,
          },
        };
      });
      const deliveryPoint: TrustedPoint = {
        ...user.deliveryPoint,
        location: {
          lat: user.deliveryPoint.location.latitude,
          lng: user.deliveryPoint.location.longitude,
        },
        hours: hours,
      };
      const parsedUser = {
        ...user,
        deliveryPoint,
      };
      return { ok: true, value: parsedUser };
    }

    return {
      ok: true,
      value: {
        ...user,
        deliveryPoint: null,
      },
    };
  }

  return { ok: false, error: 'Not found' };
};

export type AddressPost = Omit<TrustedPoint, 'id'>;

type AddressResponse = {
  id: string;
  userId: string;
};
export const postAddress = async (address: AddressPost, jwt: string): Promise<string> => {
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`,
  };

  const hours = Object.keys(address.hours).map((day) => ({
    day: +day,
    startHour: address.hours[+day].openingTime.hour,
    startMinute: address.hours[+day].openingTime.minute,
    endHour: address.hours[+day].closingTime.hour,
    endMinute: address.hours[+day].closingTime.minute,
  }));

  const body = {
    location: {
      latitude: address.location.lat,
      longitude: address.location.lng,
    },
    address: address.address,
    hours: hours,
  };

  const response = await fetch('api/points/neighbour', {
    method: 'POST',
    headers: header,
    body: JSON.stringify(body),
  });

  const parsedResponse = (await response.json()) as AddressResponse;
  return parsedResponse.id;
};

export const patchAddress = async (
  address: AddressPost,
  jwt: string,
  id: string,
): Promise<void> => {
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`,
  };

  const hours = Object.keys(address.hours).map((day) => ({
    day: +day,
    startHour: address.hours[+day].openingTime.hour,
    startMinute: address.hours[+day].openingTime.minute,
    endHour: address.hours[+day].closingTime.hour,
    endMinute: address.hours[+day].closingTime.minute,
  }));

  const body = {
    locationChange: {
      latitude: address.location.lat,
      longitude: address.location.lng,
    },
    addressChange: address.address,
    hoursChange: hours,
  };

  await fetch(`api/points/neighbour/${id}`, {
    method: 'PATCH',
    headers: header,
    body: JSON.stringify(body),
  });
};
