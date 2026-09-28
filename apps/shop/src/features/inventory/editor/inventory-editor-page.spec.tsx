import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { InventoryEditorPage } from './inventory-editor-page';
import { InventoryEditorSummary } from './inventory-editor-summary';
import {
  INVENTORY_EDITOR_FEATURE,
  INVENTORY_EDITOR_ROUTE,
} from './inventory-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[INVENTORY_EDITOR_ROUTE]}>
      <InventoryEditorPage />
    </MemoryRouter>,
  );
}

describe('InventoryEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(INVENTORY_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      INVENTORY_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${INVENTORY_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(INVENTORY_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${INVENTORY_EDITOR_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${INVENTORY_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${INVENTORY_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${INVENTORY_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${INVENTORY_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${INVENTORY_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('InventoryEditorSummary', () => {
  it('renders the summary block', () => {
    render(<InventoryEditorSummary />);
    expect(
      screen.getByTestId(`${INVENTORY_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
