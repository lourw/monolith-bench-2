import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SubscriptionsDetailsPage } from './subscriptions-details-page';
import { SubscriptionsDetailsSummary } from './subscriptions-details-summary';
import {
  SUBSCRIPTIONS_DETAILS_FEATURE,
  SUBSCRIPTIONS_DETAILS_ROUTE,
} from './subscriptions-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUBSCRIPTIONS_DETAILS_ROUTE]}>
      <SubscriptionsDetailsPage />
    </MemoryRouter>,
  );
}

describe('SubscriptionsDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUBSCRIPTIONS_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUBSCRIPTIONS_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(SUBSCRIPTIONS_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SubscriptionsDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<SubscriptionsDetailsSummary />);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
