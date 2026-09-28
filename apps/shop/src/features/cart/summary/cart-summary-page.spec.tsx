import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CartSummaryPage } from './cart-summary-page';
import { CartSummarySummary } from './cart-summary-summary';
import {
  CART_SUMMARY_FEATURE,
  CART_SUMMARY_ROUTE,
} from './cart-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CART_SUMMARY_ROUTE]}>
      <CartSummaryPage />
    </MemoryRouter>,
  );
}

describe('CartSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(CART_SUMMARY_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CART_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CART_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(CART_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CART_SUMMARY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CART_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${CART_SUMMARY_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${CART_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CART_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CART_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CartSummarySummary', () => {
  it('renders the summary block', () => {
    render(<CartSummarySummary />);
    expect(
      screen.getByTestId(`${CART_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
