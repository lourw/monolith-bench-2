import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { FeedbackListPage } from './feedback-list-page';
import { FeedbackListSummary } from './feedback-list-summary';
import {
  FEEDBACK_LIST_FEATURE,
  FEEDBACK_LIST_ROUTE,
} from './feedback-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[FEEDBACK_LIST_ROUTE]}>
      <FeedbackListPage />
    </MemoryRouter>,
  );
}

describe('FeedbackListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(FEEDBACK_LIST_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      FEEDBACK_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${FEEDBACK_LIST_FEATURE.testId}-row`),
    ).toHaveLength(FEEDBACK_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${FEEDBACK_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${FEEDBACK_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${FEEDBACK_LIST_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${FEEDBACK_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${FEEDBACK_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${FEEDBACK_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('FeedbackListSummary', () => {
  it('renders the summary block', () => {
    render(<FeedbackListSummary />);
    expect(
      screen.getByTestId(`${FEEDBACK_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
