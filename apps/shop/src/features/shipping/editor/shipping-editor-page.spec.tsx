import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShippingEditorPage } from './shipping-editor-page';
import { ShippingEditorSummary } from './shipping-editor-summary';
import {
  SHIPPING_EDITOR_FEATURE,
  SHIPPING_EDITOR_ROUTE,
} from './shipping-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SHIPPING_EDITOR_ROUTE]}>
      <ShippingEditorPage />
    </MemoryRouter>,
  );
}

describe('ShippingEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SHIPPING_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SHIPPING_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SHIPPING_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(SHIPPING_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SHIPPING_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SHIPPING_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SHIPPING_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SHIPPING_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SHIPPING_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SHIPPING_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ShippingEditorSummary', () => {
  it('renders the summary block', () => {
    render(<ShippingEditorSummary />);
    expect(
      screen.getByTestId(`${SHIPPING_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
