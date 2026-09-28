import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BundlesEditorPage } from './bundles-editor-page';
import { BundlesEditorSummary } from './bundles-editor-summary';
import {
  BUNDLES_EDITOR_FEATURE,
  BUNDLES_EDITOR_ROUTE,
} from './bundles-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[BUNDLES_EDITOR_ROUTE]}>
      <BundlesEditorPage />
    </MemoryRouter>,
  );
}

describe('BundlesEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(BUNDLES_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      BUNDLES_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${BUNDLES_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(BUNDLES_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${BUNDLES_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${BUNDLES_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${BUNDLES_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${BUNDLES_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${BUNDLES_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${BUNDLES_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('BundlesEditorSummary', () => {
  it('renders the summary block', () => {
    render(<BundlesEditorSummary />);
    expect(
      screen.getByTestId(`${BUNDLES_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
