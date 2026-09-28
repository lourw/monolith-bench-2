import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { GiftCardsOverviewPage } from './gift-cards-overview-page';
import { GiftCardsOverviewSummary } from './gift-cards-overview-summary';
import {
  GIFT_CARDS_OVERVIEW_FEATURE,
  GIFT_CARDS_OVERVIEW_ROUTE,
} from './gift-cards-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[GIFT_CARDS_OVERVIEW_ROUTE]}>
      <GiftCardsOverviewPage />
    </MemoryRouter>,
  );
}

describe('GiftCardsOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(GIFT_CARDS_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      GIFT_CARDS_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(GIFT_CARDS_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${GIFT_CARDS_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('GiftCardsOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<GiftCardsOverviewSummary />);
    expect(
      screen.getByTestId(`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
