import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AccountOverviewPage } from './account-overview-page';
import { AccountOverviewSummary } from './account-overview-summary';
import {
  ACCOUNT_OVERVIEW_FEATURE,
  ACCOUNT_OVERVIEW_ROUTE,
} from './account-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ACCOUNT_OVERVIEW_ROUTE]}>
      <AccountOverviewPage />
    </MemoryRouter>,
  );
}

describe('AccountOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ACCOUNT_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ACCOUNT_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ACCOUNT_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(ACCOUNT_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ACCOUNT_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ACCOUNT_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ACCOUNT_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ACCOUNT_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ACCOUNT_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ACCOUNT_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AccountOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<AccountOverviewSummary />);
    expect(
      screen.getByTestId(`${ACCOUNT_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
