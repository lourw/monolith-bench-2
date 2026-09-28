import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { FeedbackSummaryPage } from './feedback-summary-page';
import { FeedbackSummarySummary } from './feedback-summary-summary';
import {
  FEEDBACK_SUMMARY_FEATURE,
  FEEDBACK_SUMMARY_ROUTE,
} from './feedback-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[FEEDBACK_SUMMARY_ROUTE]}>
      <FeedbackSummaryPage />
    </MemoryRouter>,
  );
}

describe('FeedbackSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(FEEDBACK_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      FEEDBACK_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${FEEDBACK_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(FEEDBACK_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${FEEDBACK_SUMMARY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${FEEDBACK_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${FEEDBACK_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${FEEDBACK_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${FEEDBACK_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${FEEDBACK_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('FeedbackSummarySummary', () => {
  it('renders the summary block', () => {
    render(<FeedbackSummarySummary />);
    expect(
      screen.getByTestId(`${FEEDBACK_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
