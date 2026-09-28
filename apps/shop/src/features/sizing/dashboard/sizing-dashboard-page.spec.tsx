import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SizingDashboardPage } from './sizing-dashboard-page';
import { SizingDashboardSummary } from './sizing-dashboard-summary';
import {
  SIZING_DASHBOARD_FEATURE,
  SIZING_DASHBOARD_ROUTE,
} from './sizing-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SIZING_DASHBOARD_ROUTE]}>
      <SizingDashboardPage />
    </MemoryRouter>,
  );
}

describe('SizingDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SIZING_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SIZING_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SIZING_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(SIZING_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SIZING_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SIZING_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SIZING_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SIZING_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SIZING_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SIZING_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SizingDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<SizingDashboardSummary />);
    expect(
      screen.getByTestId(`${SIZING_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
