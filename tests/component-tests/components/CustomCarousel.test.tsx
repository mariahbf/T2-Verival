import React from 'react';
import { customRender } from "../../test-utils";
import { CustomCarousel } from '../../../src/app/presentation/components/Carousel/CustomCarousel';
import { vi } from 'vitest';
import { act } from '@testing-library/react';
import { Typography } from '@mui/material';

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

vi.mock('react-player', () => {
  return {
    default: () => <div>Mocked React Player</div>,
  };
});

describe('Introducao', () => {
  it('should render carousel with custom navigation and pagination', async () => {
    const { user, screen } = customRender(<CustomCarousel 
        borderRadius='1rem' 
        carouselHeight='5rem' 
        carouselWidth='5rem' 
        elements={[<Typography>slide 1</Typography>, <Typography>slide 2</Typography>]}
        navigation
        pagination
        slideHeight='5rem'
        slideWidth='5rem'
        spaceBetween={10}
    />);
    expect(screen.getByTestId('custom-carousel')).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /pagination/i })).toBeInTheDocument();
    expect(screen.getByText(/slide 1/i)).toBeInTheDocument();
    await act(async () => { user.click(screen.getByRole('button', { name: /next slide/i })) });
    expect(screen.getByText(/slide 2/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous slide/i })).toBeInTheDocument();
  });

  it('should render customized carousel', async () => {
    const { user, screen } = customRender(<CustomCarousel 
        borderRadius='1rem' 
        carouselHeight='5rem' 
        carouselWidth='5rem' 
        elements={[<Typography>slide 1</Typography>, <Typography>slide 2</Typography>]}
        navigation={false}
        pagination={false}
        slideHeight='5rem'
        slideWidth='5rem'
        spaceBetween={10}
    />);

    expect(screen.getByTestId('custom-carousel')).toBeInTheDocument();
    expect(screen.getByText(/slide 1/i)).toBeInTheDocument();
    expect(screen.getByText(/slide 2/i)).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /pagination/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next slide/i })).not.toBeInTheDocument();
    expect(screen.getByTestId('custom-carousel')).toHaveStyle({ width: '5rem', height: '5rem' });
  });
});
