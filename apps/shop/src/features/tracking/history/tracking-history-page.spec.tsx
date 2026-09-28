import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { TrackingHistoryPage } from './tracking-history-page';
import { TrackingHistorySummary } from './tracking-history-summary';
import {
  TRACKING_HISTORY_FEATURE,
  TRACKING_HISTORY_ROUTE,
} from './tracking-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[TRACKING_HISTORY_ROUTE]}>
      <TrackingHistoryPage />
    </MemoryRouter>,
  );
}

describe('TrackingHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(TRACKING_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      TRACKING_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${TRACKING_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(TRACKING_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${TRACKING_HISTORY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${TRACKING_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${TRACKING_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${TRACKING_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${TRACKING_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${TRACKING_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('TrackingHistorySummary', () => {
  it('renders the summary block', () => {
    render(<TrackingHistorySummary />);
    expect(
      screen.getByTestId(`${TRACKING_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
