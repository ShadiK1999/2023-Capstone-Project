import { FC, useCallback, useContext, useState } from 'react';
import { TrustedPoint } from '../../Models/DeliveryPoint';

import * as styles from './AddressDisplay.styles';
import { AddressRegistrationModal, IconButton, Modal } from '..';

import Eye from './Assets/Eye.svg';
import Edit from './Assets/Edit.svg';
import { UserDispatchContext } from '../../Contexts/User';
import { useJwt } from '../../Contexts/Auth';
import { AddressPost, patchAddress } from '../../Services/User';
import { printTime } from '../../Services/LocationsApiClient';

type ComponentProps = {
  trustedPoint: TrustedPoint;
};

function dayOfWeekAsString(dayIndex: number) {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex];
}

const AddressDisplay: FC<ComponentProps> = ({ trustedPoint }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const dispatch = useContext(UserDispatchContext);
  const jwt = useJwt();

  const onEditAddress = useCallback(
    async (address: AddressPost) => {
      if (jwt) {
        await patchAddress(address, jwt, trustedPoint.id);

        dispatch({
          type: 'UPDATED_ADDRESS',
          payload: {
            ...address,
            id: trustedPoint.id,
          },
        });
      }
    },
    [dispatch, jwt, trustedPoint.id],
  );
  return (
    <>
      <table className={styles.Container}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Address 1</td>
            <td>{trustedPoint.address}</td>
            <td>
              <span className={styles.VerifiedBadge}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="11" fill="#1FE86F" />
                </svg>
                <div>Verified</div>
              </span>
            </td>
            <td>
              <div className={styles.IconDiv}>
                <IconButton
                  onClick={() => {
                    setIsViewModalOpen(true);
                  }}
                >
                  <img src={Eye}></img>
                </IconButton>
                {jwt && (
                  <IconButton
                    onClick={() => {
                      setIsEditModalOpen(true);
                    }}
                  >
                    <img src={Edit}></img>
                  </IconButton>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <AddressRegistrationModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        initialAddress={trustedPoint}
        onEnter={onEditAddress}
      />
      <Modal
        title="Address details"
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
        }}
      >
        <div className={styles.ViewModalContainer}>
          <div>Address: {trustedPoint.address}</div>
          <br />
          <div>Opening hours:</div>
          <div className={styles.DayContainer}>
            {[0, 1, 2, 3, 4, 5, 6].map((day) => {
              const dayOfWeek = dayOfWeekAsString(day);
              if (!trustedPoint.hours[day]) return <div key={day}>{dayOfWeek}: Closed</div>;

              const openingTime = printTime(trustedPoint.hours[day].openingTime);
              const closingTime = printTime(trustedPoint.hours[day].closingTime);
              return (
                <div key={day}>
                  {dayOfWeek}: {openingTime} - {closingTime}
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export { AddressDisplay };
