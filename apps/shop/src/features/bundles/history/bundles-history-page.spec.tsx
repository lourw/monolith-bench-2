import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BundlesHistoryPage } from './bundles-history-page';
import { BundlesHistorySummary } from './bundles-history-summary';
import {
  BUNDLES_HISTORY_FEATURE,
  BUNDLES_HISTORY_ROUTE,
} from './bundles-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[BUNDLES_HISTORY_ROUTE]}>
      <BundlesHistoryPage />
    </MemoryRouter>,
  );
}

describe('BundlesHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(BUNDLES_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      BUNDLES_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${BUNDLES_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(BUNDLES_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${BUNDLES_HISTORY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${BUNDLES_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${BUNDLES_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${BUNDLES_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${BUNDLES_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${BUNDLES_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('BundlesHistorySummary', () => {
  it('renders the summary block', () => {
    render(<BundlesHistorySummary />);
    expect(
      screen.getByTestId(`${BUNDLES_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
