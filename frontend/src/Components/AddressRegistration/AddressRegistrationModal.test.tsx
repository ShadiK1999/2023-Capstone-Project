import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AddressRegistrationModal } from './AddressRegistrationModal';
import { errorMessages } from './AddressRegistrationPanel';

vi.mock('../../App', () => ({
  router: () => {},
}));

describe('Matches DOM Snapshot', () => {
  const { address, daysOfWeek } = errorMessages;

  beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  it('Matches DOM Snapshot', () => {
    const tree = render(
      <AddressRegistrationModal
        isOpen={true}
        onClose={() => undefined}
        onEnter={() => Promise.resolve()}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('Does not allow empty field values', async () => {
    const { getByText, findByText } = render(
      <AddressRegistrationModal
        isOpen={true}
        onClose={() => undefined}
        onEnter={() => Promise.resolve()}
      />,
    );
    fireEvent.click(getByText('Submit'));
    expect(await findByText(address)).toBeInTheDocument();
    expect(await findByText(daysOfWeek)).toBeInTheDocument();
  });
});
