import React from 'react';
import { screen } from '@testing-library/react';
import { customRender } from '../../../../../tests/test-utils';
import user from '@testing-library/user-event';
import { AccordionItem } from './AccordionItem';

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

describe('AccordionItem', () => {
  const title = 'Título do acordeão';
  const content = 'Conteúdo do acordeão';
  
  it('Should render AccordionItem with hidden content', () => {
    customRender(<AccordionItem title={title} content={content} isLast={false} />);
    
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.queryByText(content)).not.toBeVisible();
  });

  it('should expand and hide content on click', async () => {
    const { user } = customRender(<AccordionItem title={title} content={content} isLast={false} />);
 
    expect(screen.queryByText(content)).not.toBeVisible();

    await user.click(screen.getByText(title));
    expect(screen.getByText(content)).toBeVisible();

    await user.click(screen.getByText(title));
    expect(screen.queryByText(content)).not.toBeVisible();
  });
});
