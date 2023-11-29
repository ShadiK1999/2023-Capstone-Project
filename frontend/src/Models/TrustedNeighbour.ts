import { TrustedPoint } from './DeliveryPoint';

export type TrustedNeighbour = {
  name: string;
  id: string;
  email: string | null;
  phoneNumber: string;
  deliveryPoint: TrustedPoint | null;
};
