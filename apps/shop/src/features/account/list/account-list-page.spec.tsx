import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AccountListPage } from './account-list-page';
import { AccountListSummary } from './account-list-summary';
import {
  ACCOUNT_LIST_FEATURE,
  ACCOUNT_LIST_ROUTE,
} from './account-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ACCOUNT_LIST_ROUTE]}>
      <AccountListPage />
    </MemoryRouter>,
  );
}

describe('AccountListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(ACCOUNT_LIST_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ACCOUNT_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ACCOUNT_LIST_FEATURE.testId}-row`),
    ).toHaveLength(ACCOUNT_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${ACCOUNT_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ACCOUNT_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${ACCOUNT_LIST_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${ACCOUNT_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ACCOUNT_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ACCOUNT_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AccountListSummary', () => {
  it('renders the summary block', () => {
    render(<AccountListSummary />);
    expect(
      screen.getByTestId(`${ACCOUNT_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
