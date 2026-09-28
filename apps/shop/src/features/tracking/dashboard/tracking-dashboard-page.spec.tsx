import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { TrackingDashboardPage } from './tracking-dashboard-page';
import { TrackingDashboardSummary } from './tracking-dashboard-summary';
import {
  TRACKING_DASHBOARD_FEATURE,
  TRACKING_DASHBOARD_ROUTE,
} from './tracking-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[TRACKING_DASHBOARD_ROUTE]}>
      <TrackingDashboardPage />
    </MemoryRouter>,
  );
}

describe('TrackingDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(TRACKING_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      TRACKING_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${TRACKING_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(TRACKING_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${TRACKING_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${TRACKING_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${TRACKING_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${TRACKING_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${TRACKING_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${TRACKING_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('TrackingDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<TrackingDashboardSummary />);
    expect(
      screen.getByTestId(`${TRACKING_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
