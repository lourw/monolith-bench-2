import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CheckoutDetailsPage } from './checkout-details-page';
import { CheckoutDetailsSummary } from './checkout-details-summary';
import {
  CHECKOUT_DETAILS_FEATURE,
  CHECKOUT_DETAILS_ROUTE,
} from './checkout-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CHECKOUT_DETAILS_ROUTE]}>
      <CheckoutDetailsPage />
    </MemoryRouter>,
  );
}

describe('CheckoutDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CHECKOUT_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CHECKOUT_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CHECKOUT_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(CHECKOUT_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${CHECKOUT_DETAILS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CHECKOUT_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CHECKOUT_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CHECKOUT_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CHECKOUT_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CHECKOUT_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CheckoutDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<CheckoutDetailsSummary />);
    expect(
      screen.getByTestId(`${CHECKOUT_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
