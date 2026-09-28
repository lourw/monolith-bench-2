import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { InventoryDetailsPage } from './inventory-details-page';
import { InventoryDetailsSummary } from './inventory-details-summary';
import {
  INVENTORY_DETAILS_FEATURE,
  INVENTORY_DETAILS_ROUTE,
} from './inventory-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[INVENTORY_DETAILS_ROUTE]}>
      <InventoryDetailsPage />
    </MemoryRouter>,
  );
}

describe('InventoryDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(INVENTORY_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      INVENTORY_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${INVENTORY_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(INVENTORY_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${INVENTORY_DETAILS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${INVENTORY_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${INVENTORY_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${INVENTORY_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${INVENTORY_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${INVENTORY_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('InventoryDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<InventoryDetailsSummary />);
    expect(
      screen.getByTestId(`${INVENTORY_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
