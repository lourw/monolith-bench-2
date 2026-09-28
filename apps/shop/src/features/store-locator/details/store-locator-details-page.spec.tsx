import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { StoreLocatorDetailsPage } from './store-locator-details-page';
import { StoreLocatorDetailsSummary } from './store-locator-details-summary';
import {
  STORE_LOCATOR_DETAILS_FEATURE,
  STORE_LOCATOR_DETAILS_ROUTE,
} from './store-locator-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[STORE_LOCATOR_DETAILS_ROUTE]}>
      <StoreLocatorDetailsPage />
    </MemoryRouter>,
  );
}

describe('StoreLocatorDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(STORE_LOCATOR_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      STORE_LOCATOR_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${STORE_LOCATOR_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(STORE_LOCATOR_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${STORE_LOCATOR_DETAILS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${STORE_LOCATOR_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${STORE_LOCATOR_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${STORE_LOCATOR_DETAILS_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${STORE_LOCATOR_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${STORE_LOCATOR_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('StoreLocatorDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<StoreLocatorDetailsSummary />);
    expect(
      screen.getByTestId(`${STORE_LOCATOR_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
