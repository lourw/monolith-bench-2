import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { OrdersSummaryPage } from './orders-summary-page';
import { OrdersSummarySummary } from './orders-summary-summary';
import {
  ORDERS_SUMMARY_FEATURE,
  ORDERS_SUMMARY_ROUTE,
} from './orders-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ORDERS_SUMMARY_ROUTE]}>
      <OrdersSummaryPage />
    </MemoryRouter>,
  );
}

describe('OrdersSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ORDERS_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ORDERS_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ORDERS_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(ORDERS_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${ORDERS_SUMMARY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ORDERS_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ORDERS_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ORDERS_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ORDERS_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ORDERS_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('OrdersSummarySummary', () => {
  it('renders the summary block', () => {
    render(<OrdersSummarySummary />);
    expect(
      screen.getByTestId(`${ORDERS_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
