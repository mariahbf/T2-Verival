import React from 'react';
import { screen } from '@testing-library/react';
import { customRender } from '../../../../../tests/test-utils';
import { ProgressBar } from './ProgressBar';
import { vi } from 'vitest';

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


describe('ProgressBar', () => {
  it('should render progressBar and display formatted time', () => {
    customRender(<ProgressBar timeListened={75} duration={300} />);
    
    // 75 segundos = 1:15, 300 segundos = 5:00
    expect(screen.getByTestId('time-listened')).toHaveTextContent('1:15');
    expect(screen.getByText('5:00')).toBeInTheDocument();
  });
});
