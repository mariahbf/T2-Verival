import React from 'react';
import { waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Diario } from './diario';
import * as api from '@/app/api';
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
vi.mock('@/app/api', () => ({
  getDiaries: vi.fn(),
  createDiaryEntry: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock child components to simplify testing
vi.mock('../../components', () => ({
  Lotus: () => <div data-testid="mock-lotus">Mock Lotus</div>,
}));
vi.mock('../../components/DiaryLog', () => ({
  DiaryLog: ({ diaryEntries, handleClick }: any) => (
    <div data-testid="mock-diarylog">
      {diaryEntries.map((entry: any, i: number) => (
        <p key={i}>{entry.text}</p>
      ))}
      <button onClick={handleClick}>Add entry</button>
    </div>
  ),
}));
vi.mock('../../components/AddDiaryEntry', () => ({
  AddDiaryEntry: ({ handleClick }: any) => (
    <div data-testid="mock-adddiaryentry">
      <button onClick={() => handleClick('New diary entry')}>Save entry</button>
    </div>
  ),
}));
vi.mock('../../components/CircleButton', () => ({
  GenericCircleButton: ({ onClick }: any) => (
    <button aria-label="Back" onClick={onClick}>Back</button>
  ),
}));
vi.mock('../../components/loading', () => ({
  Loading: () => <div>Loading...</div>,
}));

describe('Diario Integration', () => {
  const mockRouterPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (nextRouter.useRouter as any).mockReturnValue({ push: mockRouterPush });
  });

  it('shows loading initially, loads and displays diary entries, navigates to add entry and back', async () => {
    // Mock initial API response with 2 entries
    (api.getDiaries as any).mockResolvedValue([
      { date: new Date().toISOString(), text: 'Entry 1' },
      { date: new Date().toISOString(), text: 'Entry 2' },
    ]);
    (api.createDiaryEntry as any).mockResolvedValue(undefined);

    const {user, screen} = customRender(<Diario />);

    // Should show loading initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // After loading, entries list appears
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
    expect(screen.getByTestId('mock-diarylog')).toBeInTheDocument();
    expect(screen.getByText('Entry 1')).toBeInTheDocument();
    expect(screen.getByText('Entry 2')).toBeInTheDocument();

    // Clicking "Add entry" button navigates to AddDiaryEntry screen
    await user.click(screen.getByText(/add entry/i));
    expect(screen.getByTestId('mock-adddiaryentry')).toBeInTheDocument();

    // Clicking save calls createDiaryEntry and returns to diary list
    await user.click(screen.getByText(/save entry/i));

    await waitFor(() => expect(api.createDiaryEntry).toHaveBeenCalledWith('New diary entry'));

    // After save, should return to DiaryLog and update list (getDiaries called again)
    await waitFor(() => expect(screen.getByTestId('mock-diarylog')).toBeInTheDocument());

    // Test the general back button — should call router.push('/home')
    await user.click(screen.getByRole('button', { name: /back/i }));
    expect(mockRouterPush).toHaveBeenCalledWith('/home');
  });
});
