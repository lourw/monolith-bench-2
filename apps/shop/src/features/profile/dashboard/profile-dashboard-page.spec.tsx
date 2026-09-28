import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProfileDashboardPage } from './profile-dashboard-page';
import { ProfileDashboardSummary } from './profile-dashboard-summary';
import {
  PROFILE_DASHBOARD_FEATURE,
  PROFILE_DASHBOARD_ROUTE,
} from './profile-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROFILE_DASHBOARD_ROUTE]}>
      <ProfileDashboardPage />
    </MemoryRouter>,
  );
}

describe('ProfileDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROFILE_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROFILE_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROFILE_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(PROFILE_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PROFILE_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROFILE_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROFILE_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROFILE_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROFILE_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROFILE_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ProfileDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<ProfileDashboardSummary />);
    expect(
      screen.getByTestId(`${PROFILE_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
