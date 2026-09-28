import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PaymentsDetailsPage } from './payments-details-page';
import { PaymentsDetailsSummary } from './payments-details-summary';
import {
  PAYMENTS_DETAILS_FEATURE,
  PAYMENTS_DETAILS_ROUTE,
} from './payments-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PAYMENTS_DETAILS_ROUTE]}>
      <PaymentsDetailsPage />
    </MemoryRouter>,
  );
}

describe('PaymentsDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PAYMENTS_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PAYMENTS_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PAYMENTS_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(PAYMENTS_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PAYMENTS_DETAILS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PAYMENTS_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PAYMENTS_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PAYMENTS_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PAYMENTS_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PAYMENTS_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PaymentsDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<PaymentsDetailsSummary />);
    expect(
      screen.getByTestId(`${PAYMENTS_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
