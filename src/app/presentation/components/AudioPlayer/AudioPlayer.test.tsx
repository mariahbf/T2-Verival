import React from 'react';
import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { customRender } from '../../../../../tests/test-utils';
import { AudioPlayer } from './AudioPlayer';

vi.mock('../YoutubePlayer', () => ({
  YouTubePlayer: ({ videoUrl, playing }: any) => (
    <div data-testid="youtube-player" data-playing={playing} data-url={videoUrl} />
  ),
}));

vi.mock('../ProgressBar', () => ({
  ProgressBar: ({ timeListened, duration }: any) => (
    <div data-testid="progress-bar">
      {timeListened}/{duration}
    </div>
  ),
}));

vi.mock('../PlayerControls', () => ({
  PlayerControls: ({ playing, onPlayClick, onReplayClick }: any) => (
    <div>
      <button onClick={onPlayClick} aria-label="play-button">
        {playing ? 'Pause' : 'Play'}
      </button>
      <button onClick={onReplayClick} aria-label="replay-button">Replay</button>
    </div>
  ),
}));

vi.mock('next/font/google', () => ({
  Poppins: vi.fn(() => ({
    style: { fontFamily: 'Poppins, sans-serif' },
  })),
  Hind: vi.fn(() => ({
    style: { fontFamily: 'Hind, sans-serif' },
  })),
  Inter: vi.fn(() => ({
    style: { fontFamily: 'Inter, sans-serif' },
  })),
}));

describe('AudioPlayer', () => {
  const defaultProps = {
    url: 'https://youtube.com/video',
    timeListened: 30,
    setTimeListened: vi.fn(),
    duration: 120,
    setDuration: vi.fn(),
    postRequest: vi.fn(),
  };

  it('should update url and post request on replay', async () => {
    const postRequestMock = vi.fn();
    const props = { ...defaultProps, postRequest: postRequestMock };

    const { user } = customRender(<AudioPlayer {...props} />);

    await user.click(screen.getByRole('button', { name: /replay-button/i }));

    expect(postRequestMock).toHaveBeenCalledTimes(1);
    const youtubeUrl = screen.getByTestId('youtube-player').getAttribute('data-url');
    expect(youtubeUrl).toMatch(/https:\/\/youtube\.com\/video\/?/);
  });

  it('should update video when url changes', async () => {
    const { rerender } = customRender(<AudioPlayer {...defaultProps} url="https://url-1" />);
    expect(screen.getByTestId('youtube-player')).toHaveAttribute('data-url', 'https://url-1');

    rerender(<AudioPlayer {...defaultProps} url="https://url-2" />);
    expect(screen.getByTestId('youtube-player')).toHaveAttribute('data-url', 'https://url-2');
  });
});
