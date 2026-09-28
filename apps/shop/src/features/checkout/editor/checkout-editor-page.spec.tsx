import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CheckoutEditorPage } from './checkout-editor-page';
import { CheckoutEditorSummary } from './checkout-editor-summary';
import {
  CHECKOUT_EDITOR_FEATURE,
  CHECKOUT_EDITOR_ROUTE,
} from './checkout-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CHECKOUT_EDITOR_ROUTE]}>
      <CheckoutEditorPage />
    </MemoryRouter>,
  );
}

describe('CheckoutEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CHECKOUT_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CHECKOUT_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CHECKOUT_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(CHECKOUT_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CHECKOUT_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CHECKOUT_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CHECKOUT_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CHECKOUT_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CHECKOUT_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CHECKOUT_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CheckoutEditorSummary', () => {
  it('renders the summary block', () => {
    render(<CheckoutEditorSummary />);
    expect(
      screen.getByTestId(`${CHECKOUT_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
