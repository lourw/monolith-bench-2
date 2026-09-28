import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PromotionsListPage } from './promotions-list-page';
import { PromotionsListSummary } from './promotions-list-summary';
import {
  PROMOTIONS_LIST_FEATURE,
  PROMOTIONS_LIST_ROUTE,
} from './promotions-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROMOTIONS_LIST_ROUTE]}>
      <PromotionsListPage />
    </MemoryRouter>,
  );
}

describe('PromotionsListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROMOTIONS_LIST_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROMOTIONS_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROMOTIONS_LIST_FEATURE.testId}-row`),
    ).toHaveLength(PROMOTIONS_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${PROMOTIONS_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROMOTIONS_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROMOTIONS_LIST_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROMOTIONS_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROMOTIONS_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROMOTIONS_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PromotionsListSummary', () => {
  it('renders the summary block', () => {
    render(<PromotionsListSummary />);
    expect(
      screen.getByTestId(`${PROMOTIONS_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
