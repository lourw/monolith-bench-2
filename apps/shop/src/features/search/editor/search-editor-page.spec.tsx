import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchEditorPage } from './search-editor-page';
import { SearchEditorSummary } from './search-editor-summary';
import {
  SEARCH_EDITOR_FEATURE,
  SEARCH_EDITOR_ROUTE,
} from './search-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SEARCH_EDITOR_ROUTE]}>
      <SearchEditorPage />
    </MemoryRouter>,
  );
}

describe('SearchEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SEARCH_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SEARCH_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SEARCH_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(SEARCH_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SEARCH_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SEARCH_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SEARCH_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SEARCH_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SEARCH_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SEARCH_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SearchEditorSummary', () => {
  it('renders the summary block', () => {
    render(<SearchEditorSummary />);
    expect(
      screen.getByTestId(`${SEARCH_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
