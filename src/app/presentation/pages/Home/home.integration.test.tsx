import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Home } from './home';
import * as session from '@/app/session';
import * as nextRouter from 'next/navigation';
import { customRender } from 'tests/test-utils';

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

// Mock dependencies
vi.mock('@/app/session', () => ({
  getLoggedUser: vi.fn(),
  logout: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock child components to simplify testing
vi.mock('@/app/presentation/components/AudioList/AudioList', () => ({
  default: (props: any) => <div data-testid="audio-list">AudioList - startDate: {props.startDate}</div>
}));
vi.mock('@/app/presentation/components/InfoCard', () => {
  return {
    InfoCard: (props: any) => (
      <div data-testid="mock-infocard">
        Mock InfoCard
        <button onClick={props.onClick} type="button">
          Ver introdução
        </button>
      </div>
    ),
  };
});
vi.mock('../../components/BottomNavigation/BottomNavigation', () => ({
  default: () => <div>Mocked BottomNavigation</div>,
}));
vi.mock('../Player', () => ({
  default: () => <div>Mocked Player Component</div>,
}));

describe('Home Integration', () => {
  const mockUser = {
    name: 'Mariah',
    createdAt: new Date(Date.now() - 3 * 7 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks ago
    hospitalDischarge: false,
  };

  const pushMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (session.getLoggedUser as any).mockReturnValue(mockUser);
    (nextRouter.useRouter as any).mockReturnValue({ push: pushMock });
  });

  it('renders user info, progress bar, AudioList, and handles logout', async () => {
    const {user, screen} = customRender(<Home />);

    // User's name is displayed
    expect(screen.getByText(/Olá, Mariah/i)).toBeInTheDocument();

    // Progress percentage roughly 50% (3 weeks out of 6)
    expect(screen.getByText(/50%/i)).toBeInTheDocument();

    // AudioList component is rendered
    expect(screen.getByTestId('audio-list')).toBeInTheDocument();

    // Logout button exists and functions correctly
    const logoutButton = screen.getByTestId("logout-button");
    expect(logoutButton).toBeInTheDocument();

    await user.click(logoutButton);

    expect(session.logout).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/login');
  });

  it('navigates to introduction page when InfoCard button is clicked', async () => {
    const {user, screen} = customRender(<Home />);

    const introButton = screen.getByRole('button', { name: /ver introdução/i });
    expect(introButton).toBeInTheDocument();

    await user.click(introButton);

    expect(pushMock).toHaveBeenCalledWith('/introducao');
  });

  it('shows loading text if no user is logged in', () => {
    (session.getLoggedUser as any).mockReturnValue(null);
    const {user, screen} = customRender(<Home />);

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });
});
