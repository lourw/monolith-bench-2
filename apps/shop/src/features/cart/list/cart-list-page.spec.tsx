import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CartListPage } from './cart-list-page';
import { CartListSummary } from './cart-list-summary';
import { CART_LIST_FEATURE, CART_LIST_ROUTE } from './cart-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CART_LIST_ROUTE]}>
      <CartListPage />
    </MemoryRouter>,
  );
}

describe('CartListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(CART_LIST_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CART_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CART_LIST_FEATURE.testId}-row`),
    ).toHaveLength(CART_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CART_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CART_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${CART_LIST_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${CART_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(screen.getByTestId(`${CART_LIST_FEATURE.testId}-filter`), {
      target: { value: 'zzz-no-match' },
    });
    expect(
      screen.getByTestId(`${CART_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CartListSummary', () => {
  it('renders the summary block', () => {
    render(<CartListSummary />);
    expect(
      screen.getByTestId(`${CART_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
