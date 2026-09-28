import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PaymentsHistoryPage } from './payments-history-page';
import { PaymentsHistorySummary } from './payments-history-summary';
import {
  PAYMENTS_HISTORY_FEATURE,
  PAYMENTS_HISTORY_ROUTE,
} from './payments-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PAYMENTS_HISTORY_ROUTE]}>
      <PaymentsHistoryPage />
    </MemoryRouter>,
  );
}

describe('PaymentsHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PAYMENTS_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PAYMENTS_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PAYMENTS_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(PAYMENTS_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PAYMENTS_HISTORY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PAYMENTS_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PAYMENTS_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PAYMENTS_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PAYMENTS_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PAYMENTS_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PaymentsHistorySummary', () => {
  it('renders the summary block', () => {
    render(<PaymentsHistorySummary />);
    expect(
      screen.getByTestId(`${PAYMENTS_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
