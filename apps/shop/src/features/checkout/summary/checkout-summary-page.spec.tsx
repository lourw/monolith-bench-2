import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CheckoutSummaryPage } from './checkout-summary-page';
import { CheckoutSummarySummary } from './checkout-summary-summary';
import {
  CHECKOUT_SUMMARY_FEATURE,
  CHECKOUT_SUMMARY_ROUTE,
} from './checkout-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CHECKOUT_SUMMARY_ROUTE]}>
      <CheckoutSummaryPage />
    </MemoryRouter>,
  );
}

describe('CheckoutSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CHECKOUT_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CHECKOUT_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CHECKOUT_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(CHECKOUT_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${CHECKOUT_SUMMARY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CHECKOUT_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CHECKOUT_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CHECKOUT_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CHECKOUT_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CHECKOUT_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CheckoutSummarySummary', () => {
  it('renders the summary block', () => {
    render(<CheckoutSummarySummary />);
    expect(
      screen.getByTestId(`${CHECKOUT_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
