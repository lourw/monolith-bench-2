import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { TrackingSummaryPage } from './tracking-summary-page';
import { TrackingSummarySummary } from './tracking-summary-summary';
import {
  TRACKING_SUMMARY_FEATURE,
  TRACKING_SUMMARY_ROUTE,
} from './tracking-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[TRACKING_SUMMARY_ROUTE]}>
      <TrackingSummaryPage />
    </MemoryRouter>,
  );
}

describe('TrackingSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(TRACKING_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      TRACKING_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${TRACKING_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(TRACKING_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${TRACKING_SUMMARY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${TRACKING_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${TRACKING_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${TRACKING_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${TRACKING_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${TRACKING_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('TrackingSummarySummary', () => {
  it('renders the summary block', () => {
    render(<TrackingSummarySummary />);
    expect(
      screen.getByTestId(`${TRACKING_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
