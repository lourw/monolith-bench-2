import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SupportDashboardPage } from './support-dashboard-page';
import { SupportDashboardSummary } from './support-dashboard-summary';
import {
  SUPPORT_DASHBOARD_FEATURE,
  SUPPORT_DASHBOARD_ROUTE,
} from './support-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUPPORT_DASHBOARD_ROUTE]}>
      <SupportDashboardPage />
    </MemoryRouter>,
  );
}

describe('SupportDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUPPORT_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUPPORT_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUPPORT_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(SUPPORT_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SUPPORT_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUPPORT_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUPPORT_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SUPPORT_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUPPORT_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUPPORT_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SupportDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<SupportDashboardSummary />);
    expect(
      screen.getByTestId(`${SUPPORT_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
