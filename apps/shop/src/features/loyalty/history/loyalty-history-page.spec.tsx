import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LoyaltyHistoryPage } from './loyalty-history-page';
import { LoyaltyHistorySummary } from './loyalty-history-summary';
import {
  LOYALTY_HISTORY_FEATURE,
  LOYALTY_HISTORY_ROUTE,
} from './loyalty-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[LOYALTY_HISTORY_ROUTE]}>
      <LoyaltyHistoryPage />
    </MemoryRouter>,
  );
}

describe('LoyaltyHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(LOYALTY_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      LOYALTY_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${LOYALTY_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(LOYALTY_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${LOYALTY_HISTORY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${LOYALTY_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${LOYALTY_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${LOYALTY_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${LOYALTY_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${LOYALTY_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('LoyaltyHistorySummary', () => {
  it('renders the summary block', () => {
    render(<LoyaltyHistorySummary />);
    expect(
      screen.getByTestId(`${LOYALTY_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
