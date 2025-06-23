import React from 'react';
import { render, screen } from '@testing-library/react';
import { Lotus } from './Lotus'; 
import '@testing-library/jest-dom';

describe('Lotus Component', () => {
  it('renders without crashing', () => {
    render(<Lotus />);
    const stackElement = screen.getByTestId('lotus-stack');
    expect(stackElement).toBeInTheDocument();
  });

  it('renders the StyledBox with correct styles', () => {
    render(<Lotus />);
    const styledBox = screen.getByTestId('styled-box');
    expect(styledBox).toHaveStyle({
      position: 'absolute',
      zIndex: -1,
      backgroundSize: '25rem',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      height: '16rem',
      width: '100%',
    });
  });

  it('renders a Box with height 8rem', () => {
    render(<Lotus />);
    const boxElement = screen.getByTestId('height-box');
    expect(boxElement).toHaveStyle({ height: '8rem' });
  });
});
