import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AddressesOverviewPage } from './addresses-overview-page';
import { AddressesOverviewSummary } from './addresses-overview-summary';
import {
  ADDRESSES_OVERVIEW_FEATURE,
  ADDRESSES_OVERVIEW_ROUTE,
} from './addresses-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ADDRESSES_OVERVIEW_ROUTE]}>
      <AddressesOverviewPage />
    </MemoryRouter>,
  );
}

describe('AddressesOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ADDRESSES_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ADDRESSES_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ADDRESSES_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(ADDRESSES_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ADDRESSES_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ADDRESSES_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ADDRESSES_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ADDRESSES_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ADDRESSES_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ADDRESSES_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AddressesOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<AddressesOverviewSummary />);
    expect(
      screen.getByTestId(`${ADDRESSES_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
