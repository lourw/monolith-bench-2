import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { InventoryHistoryPage } from './inventory-history-page';
import { InventoryHistorySummary } from './inventory-history-summary';
import {
  INVENTORY_HISTORY_FEATURE,
  INVENTORY_HISTORY_ROUTE,
} from './inventory-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[INVENTORY_HISTORY_ROUTE]}>
      <InventoryHistoryPage />
    </MemoryRouter>,
  );
}

describe('InventoryHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(INVENTORY_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      INVENTORY_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${INVENTORY_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(INVENTORY_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${INVENTORY_HISTORY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${INVENTORY_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${INVENTORY_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${INVENTORY_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${INVENTORY_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${INVENTORY_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('InventoryHistorySummary', () => {
  it('renders the summary block', () => {
    render(<InventoryHistorySummary />);
    expect(
      screen.getByTestId(`${INVENTORY_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
