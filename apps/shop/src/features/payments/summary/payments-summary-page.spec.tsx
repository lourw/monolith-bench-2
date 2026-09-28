import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PaymentsSummaryPage } from './payments-summary-page';
import { PaymentsSummarySummary } from './payments-summary-summary';
import {
  PAYMENTS_SUMMARY_FEATURE,
  PAYMENTS_SUMMARY_ROUTE,
} from './payments-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PAYMENTS_SUMMARY_ROUTE]}>
      <PaymentsSummaryPage />
    </MemoryRouter>,
  );
}

describe('PaymentsSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PAYMENTS_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PAYMENTS_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PAYMENTS_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(PAYMENTS_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PAYMENTS_SUMMARY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PAYMENTS_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PAYMENTS_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PAYMENTS_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PAYMENTS_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PAYMENTS_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PaymentsSummarySummary', () => {
  it('renders the summary block', () => {
    render(<PaymentsSummarySummary />);
    expect(
      screen.getByTestId(`${PAYMENTS_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
