import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShippingListPage } from './shipping-list-page';
import { ShippingListSummary } from './shipping-list-summary';
import {
  SHIPPING_LIST_FEATURE,
  SHIPPING_LIST_ROUTE,
} from './shipping-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SHIPPING_LIST_ROUTE]}>
      <ShippingListPage />
    </MemoryRouter>,
  );
}

describe('ShippingListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SHIPPING_LIST_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SHIPPING_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SHIPPING_LIST_FEATURE.testId}-row`),
    ).toHaveLength(SHIPPING_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SHIPPING_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SHIPPING_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SHIPPING_LIST_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SHIPPING_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SHIPPING_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SHIPPING_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ShippingListSummary', () => {
  it('renders the summary block', () => {
    render(<ShippingListSummary />);
    expect(
      screen.getByTestId(`${SHIPPING_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
