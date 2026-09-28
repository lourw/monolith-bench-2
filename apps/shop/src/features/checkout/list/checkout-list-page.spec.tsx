import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CheckoutListPage } from './checkout-list-page';
import { CheckoutListSummary } from './checkout-list-summary';
import {
  CHECKOUT_LIST_FEATURE,
  CHECKOUT_LIST_ROUTE,
} from './checkout-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CHECKOUT_LIST_ROUTE]}>
      <CheckoutListPage />
    </MemoryRouter>,
  );
}

describe('CheckoutListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CHECKOUT_LIST_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CHECKOUT_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CHECKOUT_LIST_FEATURE.testId}-row`),
    ).toHaveLength(CHECKOUT_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CHECKOUT_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CHECKOUT_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CHECKOUT_LIST_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CHECKOUT_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CHECKOUT_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CHECKOUT_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CheckoutListSummary', () => {
  it('renders the summary block', () => {
    render(<CheckoutListSummary />);
    expect(
      screen.getByTestId(`${CHECKOUT_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
