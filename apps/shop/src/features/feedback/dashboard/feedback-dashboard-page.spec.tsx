import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { FeedbackDashboardPage } from './feedback-dashboard-page';
import { FeedbackDashboardSummary } from './feedback-dashboard-summary';
import {
  FEEDBACK_DASHBOARD_FEATURE,
  FEEDBACK_DASHBOARD_ROUTE,
} from './feedback-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[FEEDBACK_DASHBOARD_ROUTE]}>
      <FeedbackDashboardPage />
    </MemoryRouter>,
  );
}

describe('FeedbackDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(FEEDBACK_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      FEEDBACK_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${FEEDBACK_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(FEEDBACK_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${FEEDBACK_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${FEEDBACK_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${FEEDBACK_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${FEEDBACK_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${FEEDBACK_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${FEEDBACK_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('FeedbackDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<FeedbackDashboardSummary />);
    expect(
      screen.getByTestId(`${FEEDBACK_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
