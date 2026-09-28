import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CompareEditorPage } from './compare-editor-page';
import { CompareEditorSummary } from './compare-editor-summary';
import {
  COMPARE_EDITOR_FEATURE,
  COMPARE_EDITOR_ROUTE,
} from './compare-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[COMPARE_EDITOR_ROUTE]}>
      <CompareEditorPage />
    </MemoryRouter>,
  );
}

describe('CompareEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(COMPARE_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      COMPARE_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${COMPARE_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(COMPARE_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${COMPARE_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${COMPARE_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${COMPARE_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${COMPARE_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${COMPARE_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${COMPARE_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CompareEditorSummary', () => {
  it('renders the summary block', () => {
    render(<CompareEditorSummary />);
    expect(
      screen.getByTestId(`${COMPARE_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
