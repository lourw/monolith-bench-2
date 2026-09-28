import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { InventoryListPage } from './inventory-list-page';
import { InventoryListSummary } from './inventory-list-summary';
import {
  INVENTORY_LIST_FEATURE,
  INVENTORY_LIST_ROUTE,
} from './inventory-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[INVENTORY_LIST_ROUTE]}>
      <InventoryListPage />
    </MemoryRouter>,
  );
}

describe('InventoryListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(INVENTORY_LIST_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      INVENTORY_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${INVENTORY_LIST_FEATURE.testId}-row`),
    ).toHaveLength(INVENTORY_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${INVENTORY_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${INVENTORY_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${INVENTORY_LIST_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${INVENTORY_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${INVENTORY_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${INVENTORY_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('InventoryListSummary', () => {
  it('renders the summary block', () => {
    render(<InventoryListSummary />);
    expect(
      screen.getByTestId(`${INVENTORY_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
