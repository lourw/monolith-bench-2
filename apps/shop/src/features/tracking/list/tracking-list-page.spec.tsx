import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { TrackingListPage } from './tracking-list-page';
import { TrackingListSummary } from './tracking-list-summary';
import {
  TRACKING_LIST_FEATURE,
  TRACKING_LIST_ROUTE,
} from './tracking-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[TRACKING_LIST_ROUTE]}>
      <TrackingListPage />
    </MemoryRouter>,
  );
}

describe('TrackingListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(TRACKING_LIST_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      TRACKING_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${TRACKING_LIST_FEATURE.testId}-row`),
    ).toHaveLength(TRACKING_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${TRACKING_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${TRACKING_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${TRACKING_LIST_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${TRACKING_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${TRACKING_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${TRACKING_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('TrackingListSummary', () => {
  it('renders the summary block', () => {
    render(<TrackingListSummary />);
    expect(
      screen.getByTestId(`${TRACKING_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
