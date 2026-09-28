import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { RecommendationsEditorPage } from './recommendations-editor-page';
import { RecommendationsEditorSummary } from './recommendations-editor-summary';
import {
  RECOMMENDATIONS_EDITOR_FEATURE,
  RECOMMENDATIONS_EDITOR_ROUTE,
} from './recommendations-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RECOMMENDATIONS_EDITOR_ROUTE]}>
      <RecommendationsEditorPage />
    </MemoryRouter>,
  );
}

describe('RecommendationsEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RECOMMENDATIONS_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RECOMMENDATIONS_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(RECOMMENDATIONS_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${RECOMMENDATIONS_EDITOR_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${RECOMMENDATIONS_EDITOR_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('RecommendationsEditorSummary', () => {
  it('renders the summary block', () => {
    render(<RecommendationsEditorSummary />);
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
