import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { InventorySummaryPage } from './inventory-summary-page';
import { InventorySummarySummary } from './inventory-summary-summary';
import {
  INVENTORY_SUMMARY_FEATURE,
  INVENTORY_SUMMARY_ROUTE,
} from './inventory-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[INVENTORY_SUMMARY_ROUTE]}>
      <InventorySummaryPage />
    </MemoryRouter>,
  );
}

describe('InventorySummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(INVENTORY_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      INVENTORY_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${INVENTORY_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(INVENTORY_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${INVENTORY_SUMMARY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${INVENTORY_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${INVENTORY_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${INVENTORY_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${INVENTORY_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${INVENTORY_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('InventorySummarySummary', () => {
  it('renders the summary block', () => {
    render(<InventorySummarySummary />);
    expect(
      screen.getByTestId(`${INVENTORY_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
