import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { StoreLocatorOverviewPage } from './store-locator-overview-page';
import { StoreLocatorOverviewSummary } from './store-locator-overview-summary';
import {
  STORE_LOCATOR_OVERVIEW_FEATURE,
  STORE_LOCATOR_OVERVIEW_ROUTE,
} from './store-locator-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[STORE_LOCATOR_OVERVIEW_ROUTE]}>
      <StoreLocatorOverviewPage />
    </MemoryRouter>,
  );
}

describe('StoreLocatorOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(STORE_LOCATOR_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      STORE_LOCATOR_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(STORE_LOCATOR_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('StoreLocatorOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<StoreLocatorOverviewSummary />);
    expect(
      screen.getByTestId(`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
