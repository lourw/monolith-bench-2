import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BundlesInsightsPage } from './bundles-insights-page';
import { BundlesInsightsSummary } from './bundles-insights-summary';
import {
  BUNDLES_INSIGHTS_FEATURE,
  BUNDLES_INSIGHTS_ROUTE,
} from './bundles-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[BUNDLES_INSIGHTS_ROUTE]}>
      <BundlesInsightsPage />
    </MemoryRouter>,
  );
}

describe('BundlesInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(BUNDLES_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      BUNDLES_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${BUNDLES_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(BUNDLES_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${BUNDLES_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${BUNDLES_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${BUNDLES_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${BUNDLES_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${BUNDLES_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${BUNDLES_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('BundlesInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<BundlesInsightsSummary />);
    expect(
      screen.getByTestId(`${BUNDLES_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
