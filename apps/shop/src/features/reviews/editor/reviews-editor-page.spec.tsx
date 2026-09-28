import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReviewsEditorPage } from './reviews-editor-page';
import { ReviewsEditorSummary } from './reviews-editor-summary';
import {
  REVIEWS_EDITOR_FEATURE,
  REVIEWS_EDITOR_ROUTE,
} from './reviews-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[REVIEWS_EDITOR_ROUTE]}>
      <ReviewsEditorPage />
    </MemoryRouter>,
  );
}

describe('ReviewsEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(REVIEWS_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      REVIEWS_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${REVIEWS_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(REVIEWS_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${REVIEWS_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${REVIEWS_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${REVIEWS_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${REVIEWS_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${REVIEWS_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${REVIEWS_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReviewsEditorSummary', () => {
  it('renders the summary block', () => {
    render(<ReviewsEditorSummary />);
    expect(
      screen.getByTestId(`${REVIEWS_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
