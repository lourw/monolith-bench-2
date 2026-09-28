import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CartOverviewPage } from './cart-overview-page';
import { CartOverviewSummary } from './cart-overview-summary';
import {
  CART_OVERVIEW_FEATURE,
  CART_OVERVIEW_ROUTE,
} from './cart-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CART_OVERVIEW_ROUTE]}>
      <CartOverviewPage />
    </MemoryRouter>,
  );
}

describe('CartOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CART_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CART_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CART_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(CART_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CART_OVERVIEW_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CART_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CART_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CART_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CART_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CART_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CartOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<CartOverviewSummary />);
    expect(
      screen.getByTestId(`${CART_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
