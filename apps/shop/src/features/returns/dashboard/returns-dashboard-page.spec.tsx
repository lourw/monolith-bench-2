import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReturnsDashboardPage } from './returns-dashboard-page';
import { ReturnsDashboardSummary } from './returns-dashboard-summary';
import {
  RETURNS_DASHBOARD_FEATURE,
  RETURNS_DASHBOARD_ROUTE,
} from './returns-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RETURNS_DASHBOARD_ROUTE]}>
      <ReturnsDashboardPage />
    </MemoryRouter>,
  );
}

describe('ReturnsDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RETURNS_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RETURNS_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RETURNS_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(RETURNS_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${RETURNS_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${RETURNS_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RETURNS_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${RETURNS_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RETURNS_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RETURNS_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReturnsDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<ReturnsDashboardSummary />);
    expect(
      screen.getByTestId(`${RETURNS_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
