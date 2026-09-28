import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { StoreLocatorHistoryPage } from './store-locator-history-page';
import { StoreLocatorHistorySummary } from './store-locator-history-summary';
import {
  STORE_LOCATOR_HISTORY_FEATURE,
  STORE_LOCATOR_HISTORY_ROUTE,
} from './store-locator-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[STORE_LOCATOR_HISTORY_ROUTE]}>
      <StoreLocatorHistoryPage />
    </MemoryRouter>,
  );
}

describe('StoreLocatorHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(STORE_LOCATOR_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      STORE_LOCATOR_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${STORE_LOCATOR_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(STORE_LOCATOR_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${STORE_LOCATOR_HISTORY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${STORE_LOCATOR_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${STORE_LOCATOR_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${STORE_LOCATOR_HISTORY_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${STORE_LOCATOR_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${STORE_LOCATOR_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('StoreLocatorHistorySummary', () => {
  it('renders the summary block', () => {
    render(<StoreLocatorHistorySummary />);
    expect(
      screen.getByTestId(`${STORE_LOCATOR_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
