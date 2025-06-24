import React from 'react';
import { screen } from '@testing-library/react';
import { PlayButton } from './PlayButton';
import { customRender } from '../../../../../tests/test-utils';
import user from '@testing-library/user-event';

vi.mock('next/font/google', () => ({
  Poppins: vi.fn(() => ({
    style: {
      fontFamily: 'Poppins, sans-serif',
    },
  })),
  Hind: vi.fn(() => ({
    style: {
      fontFamily: 'Hind, sans-serif',
    },
  })),
  Inter: vi.fn(() => ({
    style: {
      fontFamily: 'Inter, sans-serif',
    },
  })),
}));

describe('PlayButton', () => {
  it('should display play icon when audio is not playing', () => {
    customRender(<PlayButton playing={false} />);
    expect(screen.getByLabelText(/play button/i)).toBeInTheDocument();
    expect(screen.getByTestId('PlayArrowIcon')).toBeInTheDocument();
  });

  it('should display pause icon when audio is playing', () => {
    customRender(<PlayButton playing={true} />);
    expect(screen.getByLabelText(/play button/i)).toBeInTheDocument();
    expect(screen.getByTestId('PauseIcon')).toBeInTheDocument();
  });

  it('should call handleClick when clicked', async () => {
    const handleClick = vi.fn();

    customRender(<PlayButton playing={false} handleClick={handleClick} />);
    await user.click(screen.getByLabelText(/play button/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
