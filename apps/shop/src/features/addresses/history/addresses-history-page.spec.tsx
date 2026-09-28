import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AddressesHistoryPage } from './addresses-history-page';
import { AddressesHistorySummary } from './addresses-history-summary';
import {
  ADDRESSES_HISTORY_FEATURE,
  ADDRESSES_HISTORY_ROUTE,
} from './addresses-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ADDRESSES_HISTORY_ROUTE]}>
      <AddressesHistoryPage />
    </MemoryRouter>,
  );
}

describe('AddressesHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ADDRESSES_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ADDRESSES_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ADDRESSES_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(ADDRESSES_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ADDRESSES_HISTORY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ADDRESSES_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ADDRESSES_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ADDRESSES_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ADDRESSES_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ADDRESSES_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AddressesHistorySummary', () => {
  it('renders the summary block', () => {
    render(<AddressesHistorySummary />);
    expect(
      screen.getByTestId(`${ADDRESSES_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
