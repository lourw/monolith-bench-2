import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AccountSummaryPage } from './account-summary-page';
import { AccountSummarySummary } from './account-summary-summary';
import {
  ACCOUNT_SUMMARY_FEATURE,
  ACCOUNT_SUMMARY_ROUTE,
} from './account-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ACCOUNT_SUMMARY_ROUTE]}>
      <AccountSummaryPage />
    </MemoryRouter>,
  );
}

describe('AccountSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ACCOUNT_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ACCOUNT_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ACCOUNT_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(ACCOUNT_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${ACCOUNT_SUMMARY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ACCOUNT_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ACCOUNT_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ACCOUNT_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ACCOUNT_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ACCOUNT_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AccountSummarySummary', () => {
  it('renders the summary block', () => {
    render(<AccountSummarySummary />);
    expect(
      screen.getByTestId(`${ACCOUNT_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
