import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BundlesDashboardPage } from './bundles-dashboard-page';
import { BundlesDashboardSummary } from './bundles-dashboard-summary';
import {
  BUNDLES_DASHBOARD_FEATURE,
  BUNDLES_DASHBOARD_ROUTE,
} from './bundles-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[BUNDLES_DASHBOARD_ROUTE]}>
      <BundlesDashboardPage />
    </MemoryRouter>,
  );
}

describe('BundlesDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(BUNDLES_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      BUNDLES_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${BUNDLES_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(BUNDLES_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${BUNDLES_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${BUNDLES_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${BUNDLES_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${BUNDLES_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${BUNDLES_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${BUNDLES_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('BundlesDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<BundlesDashboardSummary />);
    expect(
      screen.getByTestId(`${BUNDLES_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
