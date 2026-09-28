import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { OrdersEditorPage } from './orders-editor-page';
import { OrdersEditorSummary } from './orders-editor-summary';
import {
  ORDERS_EDITOR_FEATURE,
  ORDERS_EDITOR_ROUTE,
} from './orders-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ORDERS_EDITOR_ROUTE]}>
      <OrdersEditorPage />
    </MemoryRouter>,
  );
}

describe('OrdersEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ORDERS_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ORDERS_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ORDERS_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(ORDERS_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${ORDERS_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ORDERS_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ORDERS_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ORDERS_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ORDERS_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ORDERS_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('OrdersEditorSummary', () => {
  it('renders the summary block', () => {
    render(<OrdersEditorSummary />);
    expect(
      screen.getByTestId(`${ORDERS_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
