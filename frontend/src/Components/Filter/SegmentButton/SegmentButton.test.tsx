// eslint-disable-next-line import/named
import { screen, render, fireEvent } from '@testing-library/react';
import { SegmentButton } from './SegmentButton';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';

describe('Filter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 8, 4));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Matches DOM Snapshot', () => {
    const tree = render(
      <SegmentButton
        buttons={['apples', 'oranges', 'bananas']}
        onSelect={() => void 0}
        initialSelected={['apples', 'oranges']}
        multiSelect={false}
      />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('Test button initial selected state.', () => {
    render(
      <SegmentButton
        buttons={['apples', 'oranges', 'bananas']}
        onSelect={() => void 0}
        initialSelected={['apples']}
        multiSelect={false}
      />,
    );

    const applesButton = screen.getByText('apples');
    const orangesButton = screen.getByText('oranges');
    const bananasButton = screen.getByText('bananas');

    expect(applesButton.getAttribute('data-selected')).toBe('true');
    expect(orangesButton.getAttribute('data-selected')).toBe('false');
    expect(bananasButton.getAttribute('data-selected')).toBe('false');
  });

  it('Test single button select mode.', () => {
    render(
      <SegmentButton
        buttons={['apples', 'oranges', 'bananas']}
        onSelect={() => void 0}
        initialSelected={[]}
        multiSelect={false}
      />,
    );

    const applesButton = screen.getByText('apples');
    const bananasButton = screen.getByText('bananas');

    expect(applesButton.getAttribute('data-selected')).toBe('false');
    expect(bananasButton.getAttribute('data-selected')).toBe('false');

    fireEvent.click(applesButton);

    expect(applesButton.getAttribute('data-selected')).toBe('true');
    expect(bananasButton.getAttribute('data-selected')).toBe('false');

    fireEvent.click(bananasButton);

    expect(applesButton.getAttribute('data-selected')).toBe('false');
    expect(bananasButton.getAttribute('data-selected')).toBe('true');
  });

  it('Test multi button selection mode.', () => {
    render(
      <SegmentButton
        buttons={['apples', 'oranges', 'bananas']}
        onSelect={() => void 0}
        initialSelected={[]}
        multiSelect={true}
      />,
    );

    const applesButton = screen.getByText('apples');
    const bananasButton = screen.getByText('bananas');

    expect(applesButton.getAttribute('data-selected')).toBe('false');
    expect(bananasButton.getAttribute('data-selected')).toBe('false');

    fireEvent.click(applesButton);

    expect(applesButton.getAttribute('data-selected')).toBe('true');
    expect(bananasButton.getAttribute('data-selected')).toBe('false');

    fireEvent.click(bananasButton);

    expect(applesButton.getAttribute('data-selected')).toBe('true');
    expect(bananasButton.getAttribute('data-selected')).toBe('true');

    fireEvent.click(bananasButton);
    fireEvent.click(applesButton);

    expect(applesButton.getAttribute('data-selected')).toBe('false');
    expect(bananasButton.getAttribute('data-selected')).toBe('false');
  });
});
