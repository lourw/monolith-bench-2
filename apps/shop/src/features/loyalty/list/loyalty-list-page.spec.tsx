import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LoyaltyListPage } from './loyalty-list-page';
import { LoyaltyListSummary } from './loyalty-list-summary';
import {
  LOYALTY_LIST_FEATURE,
  LOYALTY_LIST_ROUTE,
} from './loyalty-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[LOYALTY_LIST_ROUTE]}>
      <LoyaltyListPage />
    </MemoryRouter>,
  );
}

describe('LoyaltyListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(LOYALTY_LIST_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      LOYALTY_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${LOYALTY_LIST_FEATURE.testId}-row`),
    ).toHaveLength(LOYALTY_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${LOYALTY_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${LOYALTY_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${LOYALTY_LIST_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${LOYALTY_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${LOYALTY_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${LOYALTY_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('LoyaltyListSummary', () => {
  it('renders the summary block', () => {
    render(<LoyaltyListSummary />);
    expect(
      screen.getByTestId(`${LOYALTY_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
