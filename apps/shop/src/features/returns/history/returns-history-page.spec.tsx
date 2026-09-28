import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReturnsHistoryPage } from './returns-history-page';
import { ReturnsHistorySummary } from './returns-history-summary';
import {
  RETURNS_HISTORY_FEATURE,
  RETURNS_HISTORY_ROUTE,
} from './returns-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RETURNS_HISTORY_ROUTE]}>
      <ReturnsHistoryPage />
    </MemoryRouter>,
  );
}

describe('ReturnsHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RETURNS_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RETURNS_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RETURNS_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(RETURNS_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${RETURNS_HISTORY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${RETURNS_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RETURNS_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${RETURNS_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RETURNS_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RETURNS_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReturnsHistorySummary', () => {
  it('renders the summary block', () => {
    render(<ReturnsHistorySummary />);
    expect(
      screen.getByTestId(`${RETURNS_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
