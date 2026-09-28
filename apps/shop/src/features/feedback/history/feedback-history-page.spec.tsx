import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { FeedbackHistoryPage } from './feedback-history-page';
import { FeedbackHistorySummary } from './feedback-history-summary';
import {
  FEEDBACK_HISTORY_FEATURE,
  FEEDBACK_HISTORY_ROUTE,
} from './feedback-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[FEEDBACK_HISTORY_ROUTE]}>
      <FeedbackHistoryPage />
    </MemoryRouter>,
  );
}

describe('FeedbackHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(FEEDBACK_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      FEEDBACK_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${FEEDBACK_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(FEEDBACK_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${FEEDBACK_HISTORY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${FEEDBACK_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${FEEDBACK_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${FEEDBACK_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${FEEDBACK_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${FEEDBACK_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('FeedbackHistorySummary', () => {
  it('renders the summary block', () => {
    render(<FeedbackHistorySummary />);
    expect(
      screen.getByTestId(`${FEEDBACK_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
