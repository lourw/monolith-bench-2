import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PreordersSummaryPage } from './preorders-summary-page';
import { PreordersSummarySummary } from './preorders-summary-summary';
import {
  PREORDERS_SUMMARY_FEATURE,
  PREORDERS_SUMMARY_ROUTE,
} from './preorders-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PREORDERS_SUMMARY_ROUTE]}>
      <PreordersSummaryPage />
    </MemoryRouter>,
  );
}

describe('PreordersSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PREORDERS_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PREORDERS_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PREORDERS_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(PREORDERS_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PREORDERS_SUMMARY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PREORDERS_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PREORDERS_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PREORDERS_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PREORDERS_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PREORDERS_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PreordersSummarySummary', () => {
  it('renders the summary block', () => {
    render(<PreordersSummarySummary />);
    expect(
      screen.getByTestId(`${PREORDERS_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
