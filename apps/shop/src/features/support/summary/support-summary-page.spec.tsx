import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SupportSummaryPage } from './support-summary-page';
import { SupportSummarySummary } from './support-summary-summary';
import {
  SUPPORT_SUMMARY_FEATURE,
  SUPPORT_SUMMARY_ROUTE,
} from './support-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUPPORT_SUMMARY_ROUTE]}>
      <SupportSummaryPage />
    </MemoryRouter>,
  );
}

describe('SupportSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUPPORT_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUPPORT_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUPPORT_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(SUPPORT_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SUPPORT_SUMMARY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUPPORT_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUPPORT_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SUPPORT_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUPPORT_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUPPORT_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SupportSummarySummary', () => {
  it('renders the summary block', () => {
    render(<SupportSummarySummary />);
    expect(
      screen.getByTestId(`${SUPPORT_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
