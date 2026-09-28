import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { TrackingDetailsPage } from './tracking-details-page';
import { TrackingDetailsSummary } from './tracking-details-summary';
import {
  TRACKING_DETAILS_FEATURE,
  TRACKING_DETAILS_ROUTE,
} from './tracking-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[TRACKING_DETAILS_ROUTE]}>
      <TrackingDetailsPage />
    </MemoryRouter>,
  );
}

describe('TrackingDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(TRACKING_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      TRACKING_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${TRACKING_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(TRACKING_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${TRACKING_DETAILS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${TRACKING_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${TRACKING_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${TRACKING_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${TRACKING_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${TRACKING_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('TrackingDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<TrackingDetailsSummary />);
    expect(
      screen.getByTestId(`${TRACKING_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
