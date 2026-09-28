import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { FeedbackEditorPage } from './feedback-editor-page';
import { FeedbackEditorSummary } from './feedback-editor-summary';
import {
  FEEDBACK_EDITOR_FEATURE,
  FEEDBACK_EDITOR_ROUTE,
} from './feedback-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[FEEDBACK_EDITOR_ROUTE]}>
      <FeedbackEditorPage />
    </MemoryRouter>,
  );
}

describe('FeedbackEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(FEEDBACK_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      FEEDBACK_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${FEEDBACK_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(FEEDBACK_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${FEEDBACK_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${FEEDBACK_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${FEEDBACK_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${FEEDBACK_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${FEEDBACK_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${FEEDBACK_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('FeedbackEditorSummary', () => {
  it('renders the summary block', () => {
    render(<FeedbackEditorSummary />);
    expect(
      screen.getByTestId(`${FEEDBACK_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
