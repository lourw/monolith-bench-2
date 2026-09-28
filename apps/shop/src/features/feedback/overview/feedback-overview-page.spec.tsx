import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { FeedbackOverviewPage } from './feedback-overview-page';
import { FeedbackOverviewSummary } from './feedback-overview-summary';
import {
  FEEDBACK_OVERVIEW_FEATURE,
  FEEDBACK_OVERVIEW_ROUTE,
} from './feedback-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[FEEDBACK_OVERVIEW_ROUTE]}>
      <FeedbackOverviewPage />
    </MemoryRouter>,
  );
}

describe('FeedbackOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(FEEDBACK_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      FEEDBACK_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${FEEDBACK_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(FEEDBACK_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${FEEDBACK_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${FEEDBACK_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${FEEDBACK_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${FEEDBACK_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${FEEDBACK_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${FEEDBACK_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('FeedbackOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<FeedbackOverviewSummary />);
    expect(
      screen.getByTestId(`${FEEDBACK_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
