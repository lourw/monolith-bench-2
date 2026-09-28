import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SupportHistoryPage } from './support-history-page';
import { SupportHistorySummary } from './support-history-summary';
import {
  SUPPORT_HISTORY_FEATURE,
  SUPPORT_HISTORY_ROUTE,
} from './support-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUPPORT_HISTORY_ROUTE]}>
      <SupportHistoryPage />
    </MemoryRouter>,
  );
}

describe('SupportHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUPPORT_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUPPORT_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUPPORT_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(SUPPORT_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SUPPORT_HISTORY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUPPORT_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUPPORT_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SUPPORT_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUPPORT_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUPPORT_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SupportHistorySummary', () => {
  it('renders the summary block', () => {
    render(<SupportHistorySummary />);
    expect(
      screen.getByTestId(`${SUPPORT_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
