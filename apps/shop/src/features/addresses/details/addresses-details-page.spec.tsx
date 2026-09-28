import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AddressesDetailsPage } from './addresses-details-page';
import { AddressesDetailsSummary } from './addresses-details-summary';
import {
  ADDRESSES_DETAILS_FEATURE,
  ADDRESSES_DETAILS_ROUTE,
} from './addresses-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ADDRESSES_DETAILS_ROUTE]}>
      <AddressesDetailsPage />
    </MemoryRouter>,
  );
}

describe('AddressesDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ADDRESSES_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ADDRESSES_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ADDRESSES_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(ADDRESSES_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ADDRESSES_DETAILS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ADDRESSES_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ADDRESSES_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ADDRESSES_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ADDRESSES_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ADDRESSES_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AddressesDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<AddressesDetailsSummary />);
    expect(
      screen.getByTestId(`${ADDRESSES_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
