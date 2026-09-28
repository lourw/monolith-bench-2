import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SupportEditorPage } from './support-editor-page';
import { SupportEditorSummary } from './support-editor-summary';
import {
  SUPPORT_EDITOR_FEATURE,
  SUPPORT_EDITOR_ROUTE,
} from './support-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUPPORT_EDITOR_ROUTE]}>
      <SupportEditorPage />
    </MemoryRouter>,
  );
}

describe('SupportEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUPPORT_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUPPORT_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUPPORT_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(SUPPORT_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SUPPORT_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUPPORT_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUPPORT_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SUPPORT_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUPPORT_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUPPORT_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SupportEditorSummary', () => {
  it('renders the summary block', () => {
    render(<SupportEditorSummary />);
    expect(
      screen.getByTestId(`${SUPPORT_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
