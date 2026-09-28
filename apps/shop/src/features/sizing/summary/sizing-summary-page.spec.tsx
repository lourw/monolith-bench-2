import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SizingSummaryPage } from './sizing-summary-page';
import { SizingSummarySummary } from './sizing-summary-summary';
import {
  SIZING_SUMMARY_FEATURE,
  SIZING_SUMMARY_ROUTE,
} from './sizing-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SIZING_SUMMARY_ROUTE]}>
      <SizingSummaryPage />
    </MemoryRouter>,
  );
}

describe('SizingSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SIZING_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SIZING_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SIZING_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(SIZING_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SIZING_SUMMARY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SIZING_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SIZING_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SIZING_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SIZING_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SIZING_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SizingSummarySummary', () => {
  it('renders the summary block', () => {
    render(<SizingSummarySummary />);
    expect(
      screen.getByTestId(`${SIZING_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
