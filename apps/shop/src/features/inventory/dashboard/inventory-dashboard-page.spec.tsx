import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { InventoryDashboardPage } from './inventory-dashboard-page';
import { InventoryDashboardSummary } from './inventory-dashboard-summary';
import {
  INVENTORY_DASHBOARD_FEATURE,
  INVENTORY_DASHBOARD_ROUTE,
} from './inventory-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[INVENTORY_DASHBOARD_ROUTE]}>
      <InventoryDashboardPage />
    </MemoryRouter>,
  );
}

describe('InventoryDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(INVENTORY_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      INVENTORY_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${INVENTORY_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(INVENTORY_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${INVENTORY_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${INVENTORY_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${INVENTORY_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${INVENTORY_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${INVENTORY_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${INVENTORY_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('InventoryDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<InventoryDashboardSummary />);
    expect(
      screen.getByTestId(`${INVENTORY_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
