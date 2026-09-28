import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PreordersHistoryPage } from './preorders-history-page';
import { PreordersHistorySummary } from './preorders-history-summary';
import {
  PREORDERS_HISTORY_FEATURE,
  PREORDERS_HISTORY_ROUTE,
} from './preorders-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PREORDERS_HISTORY_ROUTE]}>
      <PreordersHistoryPage />
    </MemoryRouter>,
  );
}

describe('PreordersHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PREORDERS_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PREORDERS_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PREORDERS_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(PREORDERS_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PREORDERS_HISTORY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PREORDERS_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PREORDERS_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PREORDERS_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PREORDERS_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PREORDERS_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PreordersHistorySummary', () => {
  it('renders the summary block', () => {
    render(<PreordersHistorySummary />);
    expect(
      screen.getByTestId(`${PREORDERS_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
