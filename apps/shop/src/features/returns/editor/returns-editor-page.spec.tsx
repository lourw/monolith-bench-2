import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReturnsEditorPage } from './returns-editor-page';
import { ReturnsEditorSummary } from './returns-editor-summary';
import {
  RETURNS_EDITOR_FEATURE,
  RETURNS_EDITOR_ROUTE,
} from './returns-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RETURNS_EDITOR_ROUTE]}>
      <ReturnsEditorPage />
    </MemoryRouter>,
  );
}

describe('ReturnsEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RETURNS_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RETURNS_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RETURNS_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(RETURNS_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${RETURNS_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${RETURNS_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RETURNS_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${RETURNS_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RETURNS_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RETURNS_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReturnsEditorSummary', () => {
  it('renders the summary block', () => {
    render(<ReturnsEditorSummary />);
    expect(
      screen.getByTestId(`${RETURNS_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
