import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BundlesSummaryPage } from './bundles-summary-page';
import { BundlesSummarySummary } from './bundles-summary-summary';
import {
  BUNDLES_SUMMARY_FEATURE,
  BUNDLES_SUMMARY_ROUTE,
} from './bundles-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[BUNDLES_SUMMARY_ROUTE]}>
      <BundlesSummaryPage />
    </MemoryRouter>,
  );
}

describe('BundlesSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(BUNDLES_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      BUNDLES_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${BUNDLES_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(BUNDLES_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${BUNDLES_SUMMARY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${BUNDLES_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${BUNDLES_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${BUNDLES_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${BUNDLES_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${BUNDLES_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('BundlesSummarySummary', () => {
  it('renders the summary block', () => {
    render(<BundlesSummarySummary />);
    expect(
      screen.getByTestId(`${BUNDLES_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
