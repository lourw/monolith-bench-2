import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CompareSummaryPage } from './compare-summary-page';
import { CompareSummarySummary } from './compare-summary-summary';
import {
  COMPARE_SUMMARY_FEATURE,
  COMPARE_SUMMARY_ROUTE,
} from './compare-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[COMPARE_SUMMARY_ROUTE]}>
      <CompareSummaryPage />
    </MemoryRouter>,
  );
}

describe('CompareSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(COMPARE_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      COMPARE_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${COMPARE_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(COMPARE_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${COMPARE_SUMMARY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${COMPARE_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${COMPARE_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${COMPARE_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${COMPARE_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${COMPARE_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CompareSummarySummary', () => {
  it('renders the summary block', () => {
    render(<CompareSummarySummary />);
    expect(
      screen.getByTestId(`${COMPARE_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
