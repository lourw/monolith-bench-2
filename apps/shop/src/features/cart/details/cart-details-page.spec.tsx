import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CartDetailsPage } from './cart-details-page';
import { CartDetailsSummary } from './cart-details-summary';
import {
  CART_DETAILS_FEATURE,
  CART_DETAILS_ROUTE,
} from './cart-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CART_DETAILS_ROUTE]}>
      <CartDetailsPage />
    </MemoryRouter>,
  );
}

describe('CartDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(CART_DETAILS_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CART_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CART_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(CART_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CART_DETAILS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CART_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${CART_DETAILS_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${CART_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CART_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CART_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CartDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<CartDetailsSummary />);
    expect(
      screen.getByTestId(`${CART_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
