import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShippingOverviewPage } from './shipping-overview-page';
import { ShippingOverviewSummary } from './shipping-overview-summary';
import {
  SHIPPING_OVERVIEW_FEATURE,
  SHIPPING_OVERVIEW_ROUTE,
} from './shipping-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SHIPPING_OVERVIEW_ROUTE]}>
      <ShippingOverviewPage />
    </MemoryRouter>,
  );
}

describe('ShippingOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SHIPPING_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SHIPPING_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SHIPPING_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(SHIPPING_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SHIPPING_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SHIPPING_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SHIPPING_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SHIPPING_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SHIPPING_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SHIPPING_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ShippingOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<ShippingOverviewSummary />);
    expect(
      screen.getByTestId(`${SHIPPING_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
