import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { FeedbackInsightsPage } from './feedback-insights-page';
import { FeedbackInsightsSummary } from './feedback-insights-summary';
import {
  FEEDBACK_INSIGHTS_FEATURE,
  FEEDBACK_INSIGHTS_ROUTE,
} from './feedback-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[FEEDBACK_INSIGHTS_ROUTE]}>
      <FeedbackInsightsPage />
    </MemoryRouter>,
  );
}

describe('FeedbackInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(FEEDBACK_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      FEEDBACK_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${FEEDBACK_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(FEEDBACK_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${FEEDBACK_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${FEEDBACK_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${FEEDBACK_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${FEEDBACK_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${FEEDBACK_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${FEEDBACK_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('FeedbackInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<FeedbackInsightsSummary />);
    expect(
      screen.getByTestId(`${FEEDBACK_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
