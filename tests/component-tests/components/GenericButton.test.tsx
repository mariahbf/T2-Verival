import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { GenericButton } from '../../../src/app/presentation/components/Button/GenericButton';

describe('GenericButton Component', () => {
  it('renders the button with the correct text', () => {
    render(<GenericButton text="Click Me" themevariant="normal" />);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const handleClick = vi.fn();
    render(<GenericButton text="Click Me" themevariant="normal" onClick={handleClick} />);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    render(<GenericButton text="Disabled Button" themevariant="normal" disabled />);
    const buttonElement = screen.getByRole('button', { name: /disabled button/i });
    expect(buttonElement).toBeDisabled();
  });

  it('renders with full width when fullWidth prop is true', () => {
    render(<GenericButton text="Full Width Button" themevariant="normal" fullWidth />);
    const buttonElement = screen.getByRole('button', { name: /full width button/i });
    expect(buttonElement).toHaveStyle({ width: '100%' });
  });

  it('renders with a custom icon when the icon prop is provided', () => {
    const MockIcon = <span data-testid="mock-icon">🔍</span>;
    render(<GenericButton text="Button with Icon" themevariant="normal" icon={MockIcon} />);
    const iconElement = screen.getByTestId('mock-icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('applies custom width and height when provided', () => {
    render(<GenericButton text="Custom Size" themevariant="normal" width="200px" height="50px" />);
    const buttonElement = screen.getByRole('button', { name: /custom size/i });
    expect(buttonElement).toHaveStyle({ width: '200px', height: '50px' });
  });
});
