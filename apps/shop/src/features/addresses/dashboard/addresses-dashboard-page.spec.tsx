import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AddressesDashboardPage } from './addresses-dashboard-page';
import { AddressesDashboardSummary } from './addresses-dashboard-summary';
import {
  ADDRESSES_DASHBOARD_FEATURE,
  ADDRESSES_DASHBOARD_ROUTE,
} from './addresses-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ADDRESSES_DASHBOARD_ROUTE]}>
      <AddressesDashboardPage />
    </MemoryRouter>,
  );
}

describe('AddressesDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ADDRESSES_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ADDRESSES_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ADDRESSES_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(ADDRESSES_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ADDRESSES_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ADDRESSES_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ADDRESSES_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ADDRESSES_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ADDRESSES_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ADDRESSES_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AddressesDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<AddressesDashboardSummary />);
    expect(
      screen.getByTestId(`${ADDRESSES_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
