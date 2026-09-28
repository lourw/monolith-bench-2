import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { InventoryInsightsPage } from './inventory-insights-page';
import { InventoryInsightsSummary } from './inventory-insights-summary';
import {
  INVENTORY_INSIGHTS_FEATURE,
  INVENTORY_INSIGHTS_ROUTE,
} from './inventory-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[INVENTORY_INSIGHTS_ROUTE]}>
      <InventoryInsightsPage />
    </MemoryRouter>,
  );
}

describe('InventoryInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(INVENTORY_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      INVENTORY_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${INVENTORY_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(INVENTORY_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${INVENTORY_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${INVENTORY_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${INVENTORY_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${INVENTORY_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${INVENTORY_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${INVENTORY_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('InventoryInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<InventoryInsightsSummary />);
    expect(
      screen.getByTestId(`${INVENTORY_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
