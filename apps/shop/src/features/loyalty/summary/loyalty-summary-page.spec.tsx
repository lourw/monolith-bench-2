import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LoyaltySummaryPage } from './loyalty-summary-page';
import { LoyaltySummarySummary } from './loyalty-summary-summary';
import {
  LOYALTY_SUMMARY_FEATURE,
  LOYALTY_SUMMARY_ROUTE,
} from './loyalty-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[LOYALTY_SUMMARY_ROUTE]}>
      <LoyaltySummaryPage />
    </MemoryRouter>,
  );
}

describe('LoyaltySummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(LOYALTY_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      LOYALTY_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${LOYALTY_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(LOYALTY_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${LOYALTY_SUMMARY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${LOYALTY_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${LOYALTY_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${LOYALTY_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${LOYALTY_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${LOYALTY_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('LoyaltySummarySummary', () => {
  it('renders the summary block', () => {
    render(<LoyaltySummarySummary />);
    expect(
      screen.getByTestId(`${LOYALTY_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
