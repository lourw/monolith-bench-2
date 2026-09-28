import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShippingSummaryPage } from './shipping-summary-page';
import { ShippingSummarySummary } from './shipping-summary-summary';
import {
  SHIPPING_SUMMARY_FEATURE,
  SHIPPING_SUMMARY_ROUTE,
} from './shipping-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SHIPPING_SUMMARY_ROUTE]}>
      <ShippingSummaryPage />
    </MemoryRouter>,
  );
}

describe('ShippingSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SHIPPING_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SHIPPING_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SHIPPING_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(SHIPPING_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SHIPPING_SUMMARY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SHIPPING_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SHIPPING_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SHIPPING_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SHIPPING_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SHIPPING_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ShippingSummarySummary', () => {
  it('renders the summary block', () => {
    render(<ShippingSummarySummary />);
    expect(
      screen.getByTestId(`${SHIPPING_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
