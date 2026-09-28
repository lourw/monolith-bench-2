import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PromotionsDashboardPage } from './promotions-dashboard-page';
import { PromotionsDashboardSummary } from './promotions-dashboard-summary';
import {
  PROMOTIONS_DASHBOARD_FEATURE,
  PROMOTIONS_DASHBOARD_ROUTE,
} from './promotions-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROMOTIONS_DASHBOARD_ROUTE]}>
      <PromotionsDashboardPage />
    </MemoryRouter>,
  );
}

describe('PromotionsDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROMOTIONS_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROMOTIONS_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROMOTIONS_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(PROMOTIONS_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PROMOTIONS_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROMOTIONS_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROMOTIONS_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROMOTIONS_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROMOTIONS_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROMOTIONS_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PromotionsDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<PromotionsDashboardSummary />);
    expect(
      screen.getByTestId(`${PROMOTIONS_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
