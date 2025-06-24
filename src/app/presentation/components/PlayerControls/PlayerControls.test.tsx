import React from 'react';
import { screen } from '@testing-library/react';
import { customRender } from '../../../../../tests/test-utils';
import { PlayerControls } from './PlayerControls';
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

describe('PlayerControls', () => {
  it('should render play and replay buttons', () => {
    customRender(
      <PlayerControls
        playing={false}
        onPlayClick={() => {}}
        onReplayClick={() => {}}
      />
    );

    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'repetir-button' })).toBeInTheDocument();
  });

  it('should call onPlayClick when click on play button', async () => {
    const onPlayClick = vi.fn();

    customRender(
      <PlayerControls
        playing={false}
        onPlayClick={onPlayClick}
        onReplayClick={() => {}}
      />
    );

    await user.click(screen.getByRole('button', { name: /play/i }));
    expect(onPlayClick).toHaveBeenCalled();
  });

  it('should call onReplay click when click on replay button', async () => {
    const onReplayClick = vi.fn();

    customRender(
      <PlayerControls
        playing={false}
        onPlayClick={() => {}}
        onReplayClick={onReplayClick}
      />
    );

    await user.click(screen.getByRole('button', { name: 'repetir-button' }));
    expect(onReplayClick).toHaveBeenCalled();
  });
});
