import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SizingHistoryPage } from './sizing-history-page';
import { SizingHistorySummary } from './sizing-history-summary';
import {
  SIZING_HISTORY_FEATURE,
  SIZING_HISTORY_ROUTE,
} from './sizing-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SIZING_HISTORY_ROUTE]}>
      <SizingHistoryPage />
    </MemoryRouter>,
  );
}

describe('SizingHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SIZING_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SIZING_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SIZING_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(SIZING_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SIZING_HISTORY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SIZING_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SIZING_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SIZING_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SIZING_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SIZING_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SizingHistorySummary', () => {
  it('renders the summary block', () => {
    render(<SizingHistorySummary />);
    expect(
      screen.getByTestId(`${SIZING_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
