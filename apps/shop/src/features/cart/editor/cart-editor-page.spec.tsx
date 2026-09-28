import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CartEditorPage } from './cart-editor-page';
import { CartEditorSummary } from './cart-editor-summary';
import { CART_EDITOR_FEATURE, CART_EDITOR_ROUTE } from './cart-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CART_EDITOR_ROUTE]}>
      <CartEditorPage />
    </MemoryRouter>,
  );
}

describe('CartEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(CART_EDITOR_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CART_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CART_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(CART_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CART_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CART_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${CART_EDITOR_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${CART_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CART_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CART_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CartEditorSummary', () => {
  it('renders the summary block', () => {
    render(<CartEditorSummary />);
    expect(
      screen.getByTestId(`${CART_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
