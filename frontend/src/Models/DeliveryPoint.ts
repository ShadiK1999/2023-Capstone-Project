export interface TrustedPoint extends DeliveryPoint {
  id: string;
}

export interface DeliveryPoint {
  id: string | undefined;
  location: google.maps.LatLngLiteral;
  hours: OpeningHours;
  address: string;
}

export interface DisplayPoint extends DeliveryPoint {
  distanceText: string;
  timeText: string;
}

export type Time = {
  hour: number;
  minute: number;
};
type OpeningHour = {
  openingTime: Time;
  closingTime: Time;
};
export type OpeningHours = Record<number, OpeningHour>;
