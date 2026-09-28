import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BundlesDetailsPage } from './bundles-details-page';
import { BundlesDetailsSummary } from './bundles-details-summary';
import {
  BUNDLES_DETAILS_FEATURE,
  BUNDLES_DETAILS_ROUTE,
} from './bundles-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[BUNDLES_DETAILS_ROUTE]}>
      <BundlesDetailsPage />
    </MemoryRouter>,
  );
}

describe('BundlesDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(BUNDLES_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      BUNDLES_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${BUNDLES_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(BUNDLES_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${BUNDLES_DETAILS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${BUNDLES_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${BUNDLES_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${BUNDLES_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${BUNDLES_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${BUNDLES_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('BundlesDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<BundlesDetailsSummary />);
    expect(
      screen.getByTestId(`${BUNDLES_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
