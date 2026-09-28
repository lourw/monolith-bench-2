import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CompareHistoryPage } from './compare-history-page';
import { CompareHistorySummary } from './compare-history-summary';
import {
  COMPARE_HISTORY_FEATURE,
  COMPARE_HISTORY_ROUTE,
} from './compare-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[COMPARE_HISTORY_ROUTE]}>
      <CompareHistoryPage />
    </MemoryRouter>,
  );
}

describe('CompareHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(COMPARE_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      COMPARE_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${COMPARE_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(COMPARE_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${COMPARE_HISTORY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${COMPARE_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${COMPARE_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${COMPARE_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${COMPARE_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${COMPARE_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CompareHistorySummary', () => {
  it('renders the summary block', () => {
    render(<CompareHistorySummary />);
    expect(
      screen.getByTestId(`${COMPARE_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
