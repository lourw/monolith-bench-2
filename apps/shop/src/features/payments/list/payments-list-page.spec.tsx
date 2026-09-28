import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PaymentsListPage } from './payments-list-page';
import { PaymentsListSummary } from './payments-list-summary';
import {
  PAYMENTS_LIST_FEATURE,
  PAYMENTS_LIST_ROUTE,
} from './payments-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PAYMENTS_LIST_ROUTE]}>
      <PaymentsListPage />
    </MemoryRouter>,
  );
}

describe('PaymentsListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PAYMENTS_LIST_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PAYMENTS_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PAYMENTS_LIST_FEATURE.testId}-row`),
    ).toHaveLength(PAYMENTS_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${PAYMENTS_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PAYMENTS_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PAYMENTS_LIST_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PAYMENTS_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PAYMENTS_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PAYMENTS_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PaymentsListSummary', () => {
  it('renders the summary block', () => {
    render(<PaymentsListSummary />);
    expect(
      screen.getByTestId(`${PAYMENTS_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
