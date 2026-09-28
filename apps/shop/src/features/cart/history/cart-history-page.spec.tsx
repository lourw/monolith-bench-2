import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CartHistoryPage } from './cart-history-page';
import { CartHistorySummary } from './cart-history-summary';
import {
  CART_HISTORY_FEATURE,
  CART_HISTORY_ROUTE,
} from './cart-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CART_HISTORY_ROUTE]}>
      <CartHistoryPage />
    </MemoryRouter>,
  );
}

describe('CartHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(CART_HISTORY_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CART_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CART_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(CART_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CART_HISTORY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CART_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${CART_HISTORY_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${CART_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CART_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CART_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CartHistorySummary', () => {
  it('renders the summary block', () => {
    render(<CartHistorySummary />);
    expect(
      screen.getByTestId(`${CART_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
