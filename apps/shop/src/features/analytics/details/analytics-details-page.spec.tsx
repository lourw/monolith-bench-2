import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AnalyticsDetailsPage } from './analytics-details-page';
import { AnalyticsDetailsSummary } from './analytics-details-summary';
import {
  ANALYTICS_DETAILS_FEATURE,
  ANALYTICS_DETAILS_ROUTE,
} from './analytics-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ANALYTICS_DETAILS_ROUTE]}>
      <AnalyticsDetailsPage />
    </MemoryRouter>,
  );
}

describe('AnalyticsDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ANALYTICS_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ANALYTICS_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ANALYTICS_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(ANALYTICS_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ANALYTICS_DETAILS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ANALYTICS_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ANALYTICS_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ANALYTICS_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ANALYTICS_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ANALYTICS_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AnalyticsDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<AnalyticsDetailsSummary />);
    expect(
      screen.getByTestId(`${ANALYTICS_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
