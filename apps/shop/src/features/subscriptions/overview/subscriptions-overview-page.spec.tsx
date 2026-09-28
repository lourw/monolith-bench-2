import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SubscriptionsOverviewPage } from './subscriptions-overview-page';
import { SubscriptionsOverviewSummary } from './subscriptions-overview-summary';
import {
  SUBSCRIPTIONS_OVERVIEW_FEATURE,
  SUBSCRIPTIONS_OVERVIEW_ROUTE,
} from './subscriptions-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUBSCRIPTIONS_OVERVIEW_ROUTE]}>
      <SubscriptionsOverviewPage />
    </MemoryRouter>,
  );
}

describe('SubscriptionsOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUBSCRIPTIONS_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUBSCRIPTIONS_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(SUBSCRIPTIONS_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SubscriptionsOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<SubscriptionsOverviewSummary />);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
