import React from 'react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Accordion } from './Accordion';
import { customRender } from 'tests/test-utils';

const dummyDiaryEntries = [
  { date: '2023-10-03T12:00:00Z', text: 'Entry 1' },
  { date: '2023-10-02T12:00:00Z', text: 'Entry 2' },
  { date: '2023-10-01T12:00:00Z', text: 'Entry 3' },
];

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

describe('Accordion Component', () => {
  it('Should render Accordion component', () => {
    const { screen } = customRender(
      <Accordion diaryEntries={dummyDiaryEntries} />,
    );
    const accordionElement = screen.getByTestId(/accordion-container/i);
    expect(accordionElement).toBeInTheDocument();
  });

  it('Should display diary entries in descending order by date', () => {
    const { screen } = customRender(
      <Accordion diaryEntries={dummyDiaryEntries} />,
    );
    const entries = screen.getAllByText(/entry/i);
    expect(entries[0]).toHaveTextContent('Entry 1');
    expect(entries[1]).toHaveTextContent('Entry 2');
    expect(entries[2]).toHaveTextContent('Entry 3');
  });

  it('Should format dates correctly', () => {
    const { screen } = customRender(
      <Accordion diaryEntries={dummyDiaryEntries} />,
    );
    const dateElements = screen.getAllByText(/^\d{2}\/\d{2} - \d{2}h\d{2}$/);
    expect(dateElements.length).toBe(dummyDiaryEntries.length);
    dateElements.forEach((dateElement, index) => {
      const expectedDate = new Date(dummyDiaryEntries[index].date);
      expectedDate.setHours(expectedDate.getHours() - 3);
      const formattedDate = `${String(expectedDate.getDate()).padStart(2, '0')}/${String(expectedDate.getMonth() + 1).padStart(2, '0')} - ${String(expectedDate.getHours()).padStart(2, '0')}h${String(expectedDate.getMinutes()).padStart(2, '0')}`;
      expect(dateElement).toHaveTextContent(formattedDate);
    });
  });

  it('Should expand accordion items when clicked', async () => {
    const { user, screen } = customRender(
      <Accordion diaryEntries={dummyDiaryEntries} />,
    );
    const accordionButtons = screen.getAllByRole('button');

    await user.click(accordionButtons[0]);
    expect(screen.getByText('Entry 1')).toBeVisible();
    expect(accordionButtons[0]).toHaveAttribute('aria-expanded', 'true');

    await user.click(accordionButtons[1]);
    expect(screen.getByText('Entry 2')).toBeVisible();
    expect(accordionButtons[1]).toHaveAttribute('aria-expanded', 'true');

    await user.click(accordionButtons[2]);
    expect(screen.getByText('Entry 3')).toBeVisible();
    expect(accordionButtons[2]).toHaveAttribute('aria-expanded', 'true');
  });

  it('Should collapse accordion items when clicked again', async () => {
    const { user, screen } = customRender(
      <Accordion diaryEntries={dummyDiaryEntries} />,
    );
    const accordionButtons = screen.getAllByRole('button');

    // Expand all first
    await user.click(accordionButtons[0]);
    await user.click(accordionButtons[1]);
    await user.click(accordionButtons[2]);

    // Collapse all
    await user.click(accordionButtons[0]);
    expect(screen.queryByText('Entry 1')).not.toBeVisible();

    await user.click(accordionButtons[1]);
    expect(screen.queryByText('Entry 2')).not.toBeVisible();

    await user.click(accordionButtons[2]);
    expect(screen.queryByText('Entry 3')).not.toBeVisible();
  });
});
