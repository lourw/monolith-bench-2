import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AddressesSummaryPage } from './addresses-summary-page';
import { AddressesSummarySummary } from './addresses-summary-summary';
import {
  ADDRESSES_SUMMARY_FEATURE,
  ADDRESSES_SUMMARY_ROUTE,
} from './addresses-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ADDRESSES_SUMMARY_ROUTE]}>
      <AddressesSummaryPage />
    </MemoryRouter>,
  );
}

describe('AddressesSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ADDRESSES_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ADDRESSES_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ADDRESSES_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(ADDRESSES_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ADDRESSES_SUMMARY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ADDRESSES_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ADDRESSES_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ADDRESSES_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ADDRESSES_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ADDRESSES_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AddressesSummarySummary', () => {
  it('renders the summary block', () => {
    render(<AddressesSummarySummary />);
    expect(
      screen.getByTestId(`${ADDRESSES_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
