import React from 'react';
import { customRender } from '../../../../../tests/test-utils';
import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { GenericCircleButton } from './GenericCircleButton';
import { Add } from '@mui/icons-material';


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

describe('GenericCircleButton', () => {
  it('should render button with icon and call onClick', async () => {
    const onClickMock = vi.fn();

    const { user } = customRender(
      <GenericCircleButton
        icon={<Add data-testid="test-icon" />}
        onClick={onClickMock}
        margin="8px"
        minWidth="40px"
        padding="12px"
        borderRadius="50%"
      />
    );

    const button = screen.getByRole('button', { name: /generic circle button/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();

    await user.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
