import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SubscriptionsListPage } from './subscriptions-list-page';
import { SubscriptionsListSummary } from './subscriptions-list-summary';
import {
  SUBSCRIPTIONS_LIST_FEATURE,
  SUBSCRIPTIONS_LIST_ROUTE,
} from './subscriptions-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUBSCRIPTIONS_LIST_ROUTE]}>
      <SubscriptionsListPage />
    </MemoryRouter>,
  );
}

describe('SubscriptionsListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUBSCRIPTIONS_LIST_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUBSCRIPTIONS_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUBSCRIPTIONS_LIST_FEATURE.testId}-row`),
    ).toHaveLength(SUBSCRIPTIONS_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SUBSCRIPTIONS_LIST_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUBSCRIPTIONS_LIST_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SUBSCRIPTIONS_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUBSCRIPTIONS_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SubscriptionsListSummary', () => {
  it('renders the summary block', () => {
    render(<SubscriptionsListSummary />);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
