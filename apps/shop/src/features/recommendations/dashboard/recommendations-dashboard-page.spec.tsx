import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { RecommendationsDashboardPage } from './recommendations-dashboard-page';
import { RecommendationsDashboardSummary } from './recommendations-dashboard-summary';
import {
  RECOMMENDATIONS_DASHBOARD_FEATURE,
  RECOMMENDATIONS_DASHBOARD_ROUTE,
} from './recommendations-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RECOMMENDATIONS_DASHBOARD_ROUTE]}>
      <RecommendationsDashboardPage />
    </MemoryRouter>,
  );
}

describe('RecommendationsDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RECOMMENDATIONS_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RECOMMENDATIONS_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(RECOMMENDATIONS_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(
        `${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-panel-name`,
      ),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('RecommendationsDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<RecommendationsDashboardSummary />);
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
