import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PromotionsOverviewPage } from './promotions-overview-page';
import { PromotionsOverviewSummary } from './promotions-overview-summary';
import {
  PROMOTIONS_OVERVIEW_FEATURE,
  PROMOTIONS_OVERVIEW_ROUTE,
} from './promotions-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROMOTIONS_OVERVIEW_ROUTE]}>
      <PromotionsOverviewPage />
    </MemoryRouter>,
  );
}

describe('PromotionsOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROMOTIONS_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROMOTIONS_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROMOTIONS_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(PROMOTIONS_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PROMOTIONS_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROMOTIONS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROMOTIONS_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROMOTIONS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROMOTIONS_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROMOTIONS_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PromotionsOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<PromotionsOverviewSummary />);
    expect(
      screen.getByTestId(`${PROMOTIONS_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
