import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LoyaltyOverviewPage } from './loyalty-overview-page';
import { LoyaltyOverviewSummary } from './loyalty-overview-summary';
import {
  LOYALTY_OVERVIEW_FEATURE,
  LOYALTY_OVERVIEW_ROUTE,
} from './loyalty-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[LOYALTY_OVERVIEW_ROUTE]}>
      <LoyaltyOverviewPage />
    </MemoryRouter>,
  );
}

describe('LoyaltyOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(LOYALTY_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      LOYALTY_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${LOYALTY_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(LOYALTY_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${LOYALTY_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${LOYALTY_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${LOYALTY_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${LOYALTY_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${LOYALTY_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${LOYALTY_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('LoyaltyOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<LoyaltyOverviewSummary />);
    expect(
      screen.getByTestId(`${LOYALTY_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
