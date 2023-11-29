import { render } from '@testing-library/react';
import { PlusMinusButton } from './PlusMinusButton';
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
      <PlusMinusButton
        leftButton={{ onClick: () => void 0 }}
        rightButton={{ onClick: () => void 0 }}
      >
        Hello World
      </PlusMinusButton>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders default icons if none provided', () => {
    const { getByAltText } = render(
      <PlusMinusButton
        leftButton={{ onClick: () => void 0 }}
        rightButton={{ onClick: () => void 0 }}
      >
        Hello World
      </PlusMinusButton>,
    );
    expect(getByAltText('MINUS')).toBeInTheDocument();
    expect(getByAltText('PLUS')).toBeInTheDocument();
  });

  it('renders custom icons if provided', () => {
    const { getByAltText } = render(
      <PlusMinusButton
        leftButton={{ icon: 'FILTER', onClick: () => void 0 }}
        rightButton={{ onClick: () => void 0 }}
      >
        Hello World
      </PlusMinusButton>,
    );
    expect(getByAltText('FILTER')).toBeInTheDocument();
  });

  it('Fires onClick event', () => {
    const onClick = vi.fn();
    const { getByAltText } = render(
      <PlusMinusButton leftButton={{ onClick }} rightButton={{ onClick: () => void 0 }}>
        Hello World
      </PlusMinusButton>,
    );
    const button = getByAltText('MINUS');
    button.click();
    expect(onClick).toHaveBeenCalled();
  });
});
