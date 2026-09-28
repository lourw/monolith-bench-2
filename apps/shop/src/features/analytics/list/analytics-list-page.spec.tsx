import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AnalyticsListPage } from './analytics-list-page';
import { AnalyticsListSummary } from './analytics-list-summary';
import {
  ANALYTICS_LIST_FEATURE,
  ANALYTICS_LIST_ROUTE,
} from './analytics-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ANALYTICS_LIST_ROUTE]}>
      <AnalyticsListPage />
    </MemoryRouter>,
  );
}

describe('AnalyticsListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ANALYTICS_LIST_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ANALYTICS_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ANALYTICS_LIST_FEATURE.testId}-row`),
    ).toHaveLength(ANALYTICS_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${ANALYTICS_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ANALYTICS_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ANALYTICS_LIST_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ANALYTICS_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ANALYTICS_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ANALYTICS_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AnalyticsListSummary', () => {
  it('renders the summary block', () => {
    render(<AnalyticsListSummary />);
    expect(
      screen.getByTestId(`${ANALYTICS_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
