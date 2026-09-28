import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PromotionsSummaryPage } from './promotions-summary-page';
import { PromotionsSummarySummary } from './promotions-summary-summary';
import {
  PROMOTIONS_SUMMARY_FEATURE,
  PROMOTIONS_SUMMARY_ROUTE,
} from './promotions-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROMOTIONS_SUMMARY_ROUTE]}>
      <PromotionsSummaryPage />
    </MemoryRouter>,
  );
}

describe('PromotionsSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROMOTIONS_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROMOTIONS_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROMOTIONS_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(PROMOTIONS_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PROMOTIONS_SUMMARY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROMOTIONS_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROMOTIONS_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROMOTIONS_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROMOTIONS_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROMOTIONS_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PromotionsSummarySummary', () => {
  it('renders the summary block', () => {
    render(<PromotionsSummarySummary />);
    expect(
      screen.getByTestId(`${PROMOTIONS_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
