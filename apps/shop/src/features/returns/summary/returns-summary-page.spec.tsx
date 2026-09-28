import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReturnsSummaryPage } from './returns-summary-page';
import { ReturnsSummarySummary } from './returns-summary-summary';
import {
  RETURNS_SUMMARY_FEATURE,
  RETURNS_SUMMARY_ROUTE,
} from './returns-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RETURNS_SUMMARY_ROUTE]}>
      <ReturnsSummaryPage />
    </MemoryRouter>,
  );
}

describe('ReturnsSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RETURNS_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RETURNS_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RETURNS_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(RETURNS_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${RETURNS_SUMMARY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${RETURNS_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RETURNS_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${RETURNS_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RETURNS_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RETURNS_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReturnsSummarySummary', () => {
  it('renders the summary block', () => {
    render(<ReturnsSummarySummary />);
    expect(
      screen.getByTestId(`${RETURNS_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
