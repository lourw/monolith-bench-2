import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PaymentsOverviewPage } from './payments-overview-page';
import { PaymentsOverviewSummary } from './payments-overview-summary';
import {
  PAYMENTS_OVERVIEW_FEATURE,
  PAYMENTS_OVERVIEW_ROUTE,
} from './payments-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PAYMENTS_OVERVIEW_ROUTE]}>
      <PaymentsOverviewPage />
    </MemoryRouter>,
  );
}

describe('PaymentsOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PAYMENTS_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PAYMENTS_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PAYMENTS_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(PAYMENTS_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PAYMENTS_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PAYMENTS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PAYMENTS_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PAYMENTS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PAYMENTS_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PAYMENTS_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PaymentsOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<PaymentsOverviewSummary />);
    expect(
      screen.getByTestId(`${PAYMENTS_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
