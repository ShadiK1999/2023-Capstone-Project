import { Modal } from '..';
import { FC } from 'react';
import { AddressRegistrationPanel } from './AddressRegistrationPanel';
import { TrustedPoint } from '../../Models/DeliveryPoint';
import { AddressPost } from '../../Services/User';

type ComponentProps = {
  isOpen: boolean;
  initialAddress?: TrustedPoint;
  onClose: () => void;
  onEnter: (_: AddressPost) => Promise<void>;
};

const AddressRegistrationModal: FC<ComponentProps> = ({
  isOpen,
  onClose,
  onEnter,
  initialAddress,
}) => {
  return (
    <Modal title="Add Address Details" isOpen={isOpen} onClose={onClose}>
      <AddressRegistrationPanel
        onClose={onClose}
        onEnter={onEnter}
        initialAddress={initialAddress}
      />
    </Modal>
  );
};

export { AddressRegistrationModal };
