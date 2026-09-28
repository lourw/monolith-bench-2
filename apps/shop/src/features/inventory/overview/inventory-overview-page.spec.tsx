import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { InventoryOverviewPage } from './inventory-overview-page';
import { InventoryOverviewSummary } from './inventory-overview-summary';
import {
  INVENTORY_OVERVIEW_FEATURE,
  INVENTORY_OVERVIEW_ROUTE,
} from './inventory-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[INVENTORY_OVERVIEW_ROUTE]}>
      <InventoryOverviewPage />
    </MemoryRouter>,
  );
}

describe('InventoryOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(INVENTORY_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      INVENTORY_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${INVENTORY_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(INVENTORY_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${INVENTORY_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${INVENTORY_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${INVENTORY_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${INVENTORY_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${INVENTORY_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${INVENTORY_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('InventoryOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<InventoryOverviewSummary />);
    expect(
      screen.getByTestId(`${INVENTORY_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
