import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { WishlistEditorPage } from './wishlist-editor-page';
import { WishlistEditorSummary } from './wishlist-editor-summary';
import {
  WISHLIST_EDITOR_FEATURE,
  WISHLIST_EDITOR_ROUTE,
} from './wishlist-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[WISHLIST_EDITOR_ROUTE]}>
      <WishlistEditorPage />
    </MemoryRouter>,
  );
}

describe('WishlistEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(WISHLIST_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      WISHLIST_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${WISHLIST_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(WISHLIST_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${WISHLIST_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${WISHLIST_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${WISHLIST_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${WISHLIST_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${WISHLIST_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${WISHLIST_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('WishlistEditorSummary', () => {
  it('renders the summary block', () => {
    render(<WishlistEditorSummary />);
    expect(
      screen.getByTestId(`${WISHLIST_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
