import { render, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { Modal } from './Modal';

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
      <Modal title="Test Modal" isOpen={true} onClose={() => {}}>
        Test Modal content
      </Modal>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('Renders correct content when open', () => {
    const { getByText } = render(
      <Modal title="Test Modal Title" isOpen={true} onClose={() => {}}>
        <p>Test Modal Content</p>
      </Modal>,
    );
    expect(getByText('Test Modal Title')).toBeInTheDocument();
    expect(getByText('Test Modal Content')).toBeInTheDocument();
  });

  it('Does not render when closed', () => {
    const { queryByText } = render(
      <Modal title="Test Modal Title" isOpen={false} onClose={() => {}}>
        <p>Test Modal Content</p>
      </Modal>,
    );
    expect(queryByText('Test Modal Title')).not.toBeInTheDocument();
    expect(queryByText('Test Modal Content')).not.toBeInTheDocument();
  });

  it('Call onClose callback when close link is clicked', () => {
    const onCloseMock = vi.fn();
    const { getByText } = render(
      <Modal title="Test Title" isOpen={true} onClose={onCloseMock}>
        Test Content
      </Modal>,
    );

    fireEvent.click(getByText('Close'));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
