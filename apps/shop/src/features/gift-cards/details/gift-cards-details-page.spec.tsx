import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { GiftCardsDetailsPage } from './gift-cards-details-page';
import { GiftCardsDetailsSummary } from './gift-cards-details-summary';
import {
  GIFT_CARDS_DETAILS_FEATURE,
  GIFT_CARDS_DETAILS_ROUTE,
} from './gift-cards-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[GIFT_CARDS_DETAILS_ROUTE]}>
      <GiftCardsDetailsPage />
    </MemoryRouter>,
  );
}

describe('GiftCardsDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(GIFT_CARDS_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      GIFT_CARDS_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${GIFT_CARDS_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(GIFT_CARDS_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${GIFT_CARDS_DETAILS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${GIFT_CARDS_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${GIFT_CARDS_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${GIFT_CARDS_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${GIFT_CARDS_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${GIFT_CARDS_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('GiftCardsDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<GiftCardsDetailsSummary />);
    expect(
      screen.getByTestId(`${GIFT_CARDS_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
