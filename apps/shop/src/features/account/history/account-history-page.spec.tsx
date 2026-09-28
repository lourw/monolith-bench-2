import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AccountHistoryPage } from './account-history-page';
import { AccountHistorySummary } from './account-history-summary';
import {
  ACCOUNT_HISTORY_FEATURE,
  ACCOUNT_HISTORY_ROUTE,
} from './account-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ACCOUNT_HISTORY_ROUTE]}>
      <AccountHistoryPage />
    </MemoryRouter>,
  );
}

describe('AccountHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ACCOUNT_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ACCOUNT_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ACCOUNT_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(ACCOUNT_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${ACCOUNT_HISTORY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ACCOUNT_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ACCOUNT_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ACCOUNT_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ACCOUNT_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ACCOUNT_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AccountHistorySummary', () => {
  it('renders the summary block', () => {
    render(<AccountHistorySummary />);
    expect(
      screen.getByTestId(`${ACCOUNT_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
