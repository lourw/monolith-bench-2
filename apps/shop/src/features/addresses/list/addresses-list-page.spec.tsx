import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AddressesListPage } from './addresses-list-page';
import { AddressesListSummary } from './addresses-list-summary';
import {
  ADDRESSES_LIST_FEATURE,
  ADDRESSES_LIST_ROUTE,
} from './addresses-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ADDRESSES_LIST_ROUTE]}>
      <AddressesListPage />
    </MemoryRouter>,
  );
}

describe('AddressesListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ADDRESSES_LIST_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ADDRESSES_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ADDRESSES_LIST_FEATURE.testId}-row`),
    ).toHaveLength(ADDRESSES_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${ADDRESSES_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ADDRESSES_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ADDRESSES_LIST_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ADDRESSES_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ADDRESSES_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ADDRESSES_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AddressesListSummary', () => {
  it('renders the summary block', () => {
    render(<AddressesListSummary />);
    expect(
      screen.getByTestId(`${ADDRESSES_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
