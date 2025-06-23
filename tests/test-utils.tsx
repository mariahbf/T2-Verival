import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent, { UserEvent, Options } from '@testing-library/user-event';
import { within, screen } from '@testing-library/react';
import { CssBaseline } from '@mui/material';
import theme from '../src/theme/theme';
import { ThemeProvider } from '@mui/material/styles';

export interface CustomRenderOptions extends Omit<RenderOptions, 'queries'> {
  user?: UserEvent;
  userProps?: Options;
}

export const customRender = (
  ui: React.ReactElement,
  {
    userProps = undefined,
    user = userEvent.setup(userProps),
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  }

  return {
    ...render(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    user,
    within,
    screen,
  };
};

export * from '@testing-library/react';
export { customRender as render };
