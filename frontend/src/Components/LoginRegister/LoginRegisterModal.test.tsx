import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LoginRegisterModal } from './LoginRegisterModal';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../App', () => ({
  router: () => {},
}));

describe('Matches DOM Snapshot', () => {
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
      <MemoryRouter>
        <LoginRegisterModal
          view={'LOGIN'}
          setView={() => undefined}
          isOpen={true}
          onClose={() => undefined}
        />
      </MemoryRouter>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('Matches DOM Snapshot', () => {
    const tree = render(
      <MemoryRouter>
        <LoginRegisterModal
          view={'REGISTER'}
          setView={() => undefined}
          isOpen={true}
          onClose={() => undefined}
        />
      </MemoryRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});
