import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PromotionsHistoryPage } from './promotions-history-page';
import { PromotionsHistorySummary } from './promotions-history-summary';
import {
  PROMOTIONS_HISTORY_FEATURE,
  PROMOTIONS_HISTORY_ROUTE,
} from './promotions-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROMOTIONS_HISTORY_ROUTE]}>
      <PromotionsHistoryPage />
    </MemoryRouter>,
  );
}

describe('PromotionsHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROMOTIONS_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROMOTIONS_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROMOTIONS_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(PROMOTIONS_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PROMOTIONS_HISTORY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROMOTIONS_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROMOTIONS_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROMOTIONS_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROMOTIONS_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROMOTIONS_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PromotionsHistorySummary', () => {
  it('renders the summary block', () => {
    render(<PromotionsHistorySummary />);
    expect(
      screen.getByTestId(`${PROMOTIONS_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
