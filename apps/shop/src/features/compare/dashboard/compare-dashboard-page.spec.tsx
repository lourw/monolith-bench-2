import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CompareDashboardPage } from './compare-dashboard-page';
import { CompareDashboardSummary } from './compare-dashboard-summary';
import {
  COMPARE_DASHBOARD_FEATURE,
  COMPARE_DASHBOARD_ROUTE,
} from './compare-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[COMPARE_DASHBOARD_ROUTE]}>
      <CompareDashboardPage />
    </MemoryRouter>,
  );
}

describe('CompareDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(COMPARE_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      COMPARE_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${COMPARE_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(COMPARE_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${COMPARE_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${COMPARE_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${COMPARE_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${COMPARE_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${COMPARE_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${COMPARE_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CompareDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<CompareDashboardSummary />);
    expect(
      screen.getByTestId(`${COMPARE_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
