import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SubscriptionsHistoryPage } from './subscriptions-history-page';
import { SubscriptionsHistorySummary } from './subscriptions-history-summary';
import {
  SUBSCRIPTIONS_HISTORY_FEATURE,
  SUBSCRIPTIONS_HISTORY_ROUTE,
} from './subscriptions-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUBSCRIPTIONS_HISTORY_ROUTE]}>
      <SubscriptionsHistoryPage />
    </MemoryRouter>,
  );
}

describe('SubscriptionsHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUBSCRIPTIONS_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUBSCRIPTIONS_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(SUBSCRIPTIONS_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SubscriptionsHistorySummary', () => {
  it('renders the summary block', () => {
    render(<SubscriptionsHistorySummary />);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
