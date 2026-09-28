import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SubscriptionsSummaryPage } from './subscriptions-summary-page';
import { SubscriptionsSummarySummary } from './subscriptions-summary-summary';
import {
  SUBSCRIPTIONS_SUMMARY_FEATURE,
  SUBSCRIPTIONS_SUMMARY_ROUTE,
} from './subscriptions-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUBSCRIPTIONS_SUMMARY_ROUTE]}>
      <SubscriptionsSummaryPage />
    </MemoryRouter>,
  );
}

describe('SubscriptionsSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUBSCRIPTIONS_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUBSCRIPTIONS_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(SUBSCRIPTIONS_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SubscriptionsSummarySummary', () => {
  it('renders the summary block', () => {
    render(<SubscriptionsSummarySummary />);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
